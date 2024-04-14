const sharp = require('sharp');

const { randomNumberGenerator, formatDbResponse, sortEntities } = require('../utils/utility-functions');
const { 
  cloudinaryUploader, 
  getPicturesDirPath, 
  getPictureUrl, 
  getPicturePublicId, 
  deleteResource,
  getGuestPictureUrl,
} = require('../utils/cloudinary');

async function getAllPictures (knex, params, userType) {
  const { userid, estateid } = params;

    try {
      const pictures = await knex.select('*')
        .from('pictures')
        .where('estate_id', '=', estateid)
        .returning('*');

      const formattedPictures = pictures.map(pic => ({
        pictureId: pic.picture_id,
        filename: pic.filename,
        categoryId: pic.category_id,
        position: pic.position,
        smallSizeUrl: pic.auto_generated ?
          getGuestPictureUrl(pic.filename, 'small') :
          getPictureUrl(userid, estateid, pic.filename, 'small', userType),
        largeSizeUrl: pic.auto_generated ?
          getGuestPictureUrl(pic.filename, 'large') :
          getPictureUrl(userid, estateid, pic.filename, 'large', userType),
      }))

      // console.log('formattedPictures: ', formattedPictures);

      return formattedPictures;
    } catch (err) {
      throw new Error(err)
    }
}

async function getAllGuestsPictures (knex) {
  try {
    const pictures = await knex.select('picture_id', 'filename')
      .from('guest_pictures')
      .returning('*');

    return pictures;
  } catch (err) {
    throw new Error(err);
  }
}

async function postGuestPicture (knex, params, filename) {
  try {
    const { userid, estateid } = params;
    const picture = await knex.insert({
      user_id: userid,
      estate_id: estateid,
      filename,
      auto_generated: true,
    })
      .into('pictures')
      .returning('*')

    const formattedPicture = {
      pictureId: picture[0].picture_id,
      filename,
      smallSizeUrl: getGuestPictureUrl(filename, 'small'),
      largeSizeUrl: getGuestPictureUrl(filename, 'large'),
    } 

    console.log('formattedPicture: ', formattedPicture);

    return formattedPicture;
  } catch (err) {
    throw new Error(err);
  }
}

async function postPicture (knex, params, file, userType, categoryId, position) {

  const { userid, estateid } = params;
  const { buffer } = file;
  const filename = userid+'_'+estateid+'_'+randomNumberGenerator();

    try {
      const smallPicBuffer = await sharp(buffer)
        .toFormat('webp')
        .webp({ quality: 80 })
        .resize({ width: 480 })
        .toBuffer()

      const largePicBuffer = await sharp(buffer)
        .toFormat('webp')
        .webp({ quality: 80 })
        .resize({ width: 1920 })
        .toBuffer()

      const uploadedPictures = await Promise.all([
        cloudinaryUploader(
          smallPicBuffer,
          filename,
          getPicturesDirPath(userid, estateid, 'small', userType),
          'img',
          'small'
        ),
        cloudinaryUploader(
          largePicBuffer,
          filename,
          getPicturesDirPath(userid, estateid, 'large', userType),
          'img',
          'large'
        )
      ])

      console.log('uploadedPictures: ', uploadedPictures);

      const [ picture ] = await knex.insert({
        user_id: userid,
        estate_id: estateid,
        filename,
        category_id: !isNaN(categoryId) ? categoryId : null,
        position,
      })
        .into('pictures')
        .returning('*')

      const formattedPicture = {
        pictureId: picture.picture_id,
        filename: picture.filename,
        smallSizeUrl: getPictureUrl(userid, estateid, picture.filename, 'small', userType),
        largeSizeUrl: getPictureUrl(userid, estateid, picture.filename, 'large', userType),
        categoryId: picture.category_id,
        position: picture.position,
      } 

      console.log('formattedPicture: ', formattedPicture);

      return formattedPicture;
    } catch (err) {
      throw new Error(`There is an error, ${err}`)
    }
}

async function patchPicturesPosition (knex, userid, estateid, userType, categories) {
  try {
    const trxResult = await knex.transaction(async (trx) => {
      if (categories.length) {
        const updatedPictures = await Promise.all(categories.map(async cid => await patchPicturesPositionFromCategory(trx, userid, estateid, userType, cid)));
        return updatedPictures.flat().map(p => formatDbResponse(p));
      } else {
        const updatedPicture = await patchPicturesPositionFromCategory(trx, userid, estateid, userType, categories);
        return updatedPicture;
      };
    })
    return trxResult;
  } catch (err) {
    console.error(`there was an error when trying to update the position of some pictures: ${err}`)
  }
};

async function patchPicturesPositionFromCategory (knexInstance, userid, estateid, userType, categoryid) {
  if (!categoryid) categoryid = null; // handle undefined category
  const pictures = await knexInstance('pictures')
    .select('*')
    .where('category_id', categoryid)
    .andWhere('estate_id', estateid)
    .returning('*');

  if (!pictures.length) return [];

  const ordered = sortEntities(pictures, 'position')

  const positionUpdated = ordered.map((p, idx) => ({ picture_id: p.picture_id, position: idx + 1 }));

  const updatedData = await Promise.all(positionUpdated.map(async p => {
    const [ updatedPicture ] = await knexInstance('pictures')
      .update({ position: p.position })
      .where('picture_id', p.picture_id)
      .returning('*');

    const formattedPicture = formatDbResponse(updatedPicture);

    return {
      ...formattedPicture,
      smallSizeUrl: updatedPicture.auto_generated ?
        getGuestPictureUrl(updatedPicture.filename, 'small') :
        getPictureUrl(userid, estateid, updatedPicture.filename, 'small', userType),
      largeSizeUrl: updatedPicture.auto_generated ?
        getGuestPictureUrl(updatedPicture.filename, 'large') :
        getPictureUrl(userid, estateid, updatedPicture.filename, 'large', userType),
    };
  }));

  return updatedData;
};

async function deletePicture (knex, params, userType) {
  const { userid, estateid, pictureid } = params;
    
    try {
      const [ deletedPicture ] = await knex('pictures')
        .where('picture_id', '=', pictureid)
        .del()
        .returning([ 'picture_id' ])

      const { filename, auto_generated } = deletedPicture;

      if (!auto_generated) {
        await Promise.all([
          deleteResource(getPicturePublicId(userid, estateid, filename, 'small', userType)),
          deleteResource(getPicturePublicId(userid, estateid, filename, 'large', userType)),
        ])
      }

      return Number(deletedPicture.picture_id);
    } catch (err) {
      throw new Error (`there was an error: ${err}`)
    }
}

module.exports = {
  getAllPictures,
  postPicture,
  patchPicturesPosition,
  deletePicture,
  getAllGuestsPictures,
  postGuestPicture
}
