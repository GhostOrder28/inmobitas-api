const fsPromises = require('fs-extra').promises;
const { getPicturePublicId, deleteResource } = require('../utils/cloudinary');

const deletePicturesHandler = knex => (req, res) => {

  const { userid, estateid, pictureid } = req.params;


  (async function () {
    
    try {
      
      const deletedPicture = await knex('pictures')
      .where('picture_id', '=', pictureid)
      .del()
      .returning('*')

      const { filename } = deletedPicture[0];

      await Promise.all([
        deleteResource(getPicturePublicId(userid, estateid, filename, 'small')),
        deleteResource(getPicturePublicId(userid, estateid, filename, 'large')),
      ])

      res.status(200).json(Number(pictureid));
    } catch (err) {
      throw new Error (`there was an error: ${err}`)
    }

  })()
}

module.exports = {
  deletePicturesHandler
}
