const express = require('express');

const {
  httpGetAllCategories,
  httpPostCategory,
  httpPatchCategoryName,
  httpPatchCategoriesPosition,
  httpDeleteCategory,
} = require('./categories.controller');

const categoriesRouter = express.Router();

categoriesRouter.get('/:userid/:estateid', httpGetAllCategories());
categoriesRouter.post('/:userid/:estateid', httpPostCategory());
categoriesRouter.patch('/:categoryid', httpPatchCategoryName());
categoriesRouter.patch('/:estateid', httpPatchCategoriesPosition());
categoriesRouter.delete('/:userid/:estateid/:categoryid', httpDeleteCategory());

module.exports = categoriesRouter;

