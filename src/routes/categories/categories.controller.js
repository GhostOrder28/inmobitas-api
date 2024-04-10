const {
  getAllCategories,
  postCategory,
  patchCategoryName,
  deleteCategory,
} = require('../../models/categories.model');

function httpGetAllCategories () {
  return async (req, res) => {
    const { params: { estateid }, knexInstance, user: { userType } } = req;
    try {
      const categories = await getAllCategories(knexInstance, estateid, userType);
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
      const category = await postCategory(knexInstance, estateid, body);
      return res.status(200).json(category);
    } catch (error) {
      throw new Error(`There is an error, ${error}`);
    }
  }
}

function httpPatchCategoryName () {
  return async (req, res) => {
    console.log('req.params: ', req.params);
    const { params: { categoryid }, knexInstance, user: { userType }, body: { name } } = req;
    try {
      const updatedName = await patchCategoryName(knexInstance, categoryid, name);
      return res.status(200).json({ updatedName });
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
  httpDeleteCategory,
}

