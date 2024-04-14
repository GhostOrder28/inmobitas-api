const {
  getAllPictures,
  postPicture,
  patchPicturesPosition,
  deletePicture,
} = require('../../models/pictures.model');

function httpGetAllPictures () {
  return async (req, res) => {
    const { params, knexInstance, user: { userType } } = req;
    try {
      const pictures = await getAllPictures(knexInstance, params, userType);
      return res.status(200).json(pictures);
    } catch (error) {
      throw new Error(`There is an error, ${error}`);
    }
  }
}

function httpPostPicture () {
  return async (req, res) => {
    const { params, knexInstance, file, user: { userType }, body: { categoryId, position } } = req;
    try {
      const picture = await postPicture(knexInstance, params, file, userType, categoryId, position);
      return res.status(200).json(picture);
    } catch (error) {
      throw new Error(`There is an error, ${error}`);
    }
  }
}

function httpPatchPicturesPosition () {
  return async (req, res) => {
    try {
      const {
        knexInstance, 
        params: { userid, estateid },
        user: { userType },
        query: { categories }
      } = req;
      console.log('categories: ', categories);

      const parsedCategories = categories.map ? categories.map(c => Number(c)) : Number(categories);
      console.log('parsedCategories: ', parsedCategories);

      const updatedPictures = await patchPicturesPosition(knexInstance, userid, estateid, userType, parsedCategories);

      return res.status(200).json({ updatedPictures });
    } catch (error) {
      throw new Error(`There is an error, ${error}`);
    }
  }
}

function httpDeletePicture () {
  return async (req, res) => {
    const { params, knexInstance, user: { userType } } = req;
    try {
      const deletedPicture = await deletePicture(knexInstance, params, userType);
      return res.status(200).json(deletedPicture);
    } catch (error) {
      throw new Error(`There is an error, ${error}`);
    }
  }
}

module.exports = {
  httpGetAllPictures,
  httpPostPicture,
  httpPatchPicturesPosition,
  httpDeletePicture,
}
