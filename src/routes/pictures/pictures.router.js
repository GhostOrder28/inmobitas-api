const express = require('express');

const {
  httpGetAllPictures,
  httpPostPicture,
  httpPatchPicturesPosition,
  httpDeletePicture,
} = require('./pictures.controller');

const { uploadMiddleware } = require('../../utils/multer-conf');

const picturesRouter = express.Router();

picturesRouter.get('/:userid/:estateid', httpGetAllPictures());
picturesRouter.post('/:userid/:estateid', uploadMiddleware.single('file'), httpPostPicture());
picturesRouter.patch('/:userid/:estateid', httpPatchPicturesPosition());
picturesRouter.delete('/:userid/:estateid/:pictureid', httpDeletePicture());

module.exports = picturesRouter;
