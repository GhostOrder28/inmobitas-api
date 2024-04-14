const {
  getAllCategories,
  postCategory,
  patchCategoryName,
  patchCategoriesPosition,
  deleteCategory,
} = require('../../models/categories.model');

function httpGetAllCategories () {
  return async (req, res) => {
    const { 
      params: { estateid }, knexInstance, 
      query: { update },
      user: { userType } 
    } = req;
    try {
      const categories = await getAllCategories(knexInstance, estateid, userType, update);
      return res.status(200).json(categories);
    } catch (error) {
      throw new Error(`There is an error, ${error}`);
    }
  }
}

function httpPostCategory () {
  return async (req, res) => {
    const { params: { estateid }, knexInstance, body } = req;
    try {
      const newCategory = await postCategory(knexInstance, estateid, body);

      return res.status(200).json(newCategory);
    } catch (error) {
      throw new Error(`There is an error, ${error}`);
    }
  }
}

function httpPatchCategoryName () {
  return async (req, res, next) => {
    try {
      const {
        params: { categoryid }, 
        knexInstance,
        user: { userType }, 
        body: { name },
        query: { update }
      } = req;
      console.log('update: ', Boolean(update));

      if (Boolean(update)) return next();

      const updatedName = await patchCategoryName(knexInstance, categoryid, name);

      return res.status(200).json({ updatedName });
    } catch (error) {
      throw new Error(`There is an error, ${error}`);
    }
  }
}

function httpPatchCategoriesPosition () {
  return async (req, res) => {
    try {
      const {
        params: { estateid }, 
        knexInstance, 
        user: { userType } 
      } = req;

      const updatedCategories = await patchCategoriesPosition(knexInstance, estateid);

      return res.status(200).json({ updatedCategories });
    } catch (error) {
      throw new Error(`There is an error, ${error}`);
    }
  }
}

function httpDeleteCategory () {
  return async (req, res) => {
    const { params: { categoryid, userid, estateid }, knexInstance, user: { userType } } = req;
    try {
      const deletedCategory = await deleteCategory(knexInstance, userid, estateid, categoryid, userType);
      return res.status(200).json(deletedCategory);
    } catch (error) {
      throw new Error(`There is an error, ${error}`);
    }
  }
}

module.exports = {
  httpGetAllCategories,
  httpPostCategory,
  httpPatchCategoryName,
  httpPatchCategoriesPosition,
  httpDeleteCategory,
}

