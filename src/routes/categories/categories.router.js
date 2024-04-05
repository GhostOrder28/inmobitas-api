const express = require('express');

const {
  httpGetAllCategories,
  httpPostCategory,
  httpPatchCategoryName,
  httpDeleteCategory,
} = require('./categories.controller');

const categoriesRouter = express.Router();

categoriesRouter.get('/:userid/:estateid', httpGetAllCategories());
categoriesRouter.post('/:userid/:estateid', httpPostCategory());
categoriesRouter.patch('/:categoryid', httpPatchCategoryName());
categoriesRouter.delete('/:userid/:estateid/:pictureid', httpDeleteCategory());

module.exports = categoriesRouter;

