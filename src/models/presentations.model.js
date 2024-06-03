const { getPictureUrl, getGuestPictureUrl } = require('../utils/cloudinary');
const pdfBuilder = require('../service/pdf-builder');

async function getPresentation (knex, params, t, userType) {
  try {
    const { userid, estateid } = params;
    const contactMessage = {
      bookAnAppointment: t('bookAnAppointment'),
      contactMeAt: t('contactMeAt')
    } 

    const userData = await knex.select('names', 'contact_phone')
      .from('users')
      .where('user_id', '=', userid)
      .returning('*');

    // const documentsData = await knex.select('*')
    //   .from('documents')
    //   .where('user_id', '=', userid)
    //   .andWhere('estate_id', '=', estateid)
    //   .returning('*');

    const pictures = await knex('categories')
      .where('categories.estate_id', estateid)
      .join('pictures', 'categories.category_id', 'pictures.category_id')
      .orderBy('category_position', 'picture_position')
      .returning('*');

    const picturesWithUrl = pictures.map(p => {
      if (p.auto_generated) {
        return { ...p, url: getGuestPictureUrl(p.filename, 'large') };
      } else {
        return { ...p, url: getPictureUrl(userid, estateid, p.filename, 'large', userType) };
      }
    });

    const categories = [ ...new Set(pictures.map(p => p.name)) ] // this is the name of the category probably needs refactor

    const groupedPictures = categories.map(categoryName => {
      const pictures = picturesWithUrl.filter(p => p.name === categoryName); // i should find a better naming for this, cause it is already used in another scope
      return { categoryName, pictures }
    });

    const pdfBuffer = await pdfBuilder(groupedPictures, userData[0], contactMessage);

    return pdfBuffer;

  } catch (error) {
    console.log(error); 
  }

}

module.exports = {
  getPresentation
}
