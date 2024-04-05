const { formatDbResponse } = require('../utils/utility-functions');

async function getAllCategories (knex, estateid) {
  try {
    const categories = await knex('categories')
      .select('*')
      .where('estate_id', estateid)
      .returning('*');

    const formattedCategories = categories.map(p => formatDbResponse(p));

    return formattedCategories;
  } catch (err) {
    throw new Error(err);
  }   
};


async function postCategory (knex, estateid, body) {
  try {
    const category = await knex('categories')
      .insert({ ...body, estate_id: estateid })
      .returning('*');

    const formattedCategory = formatDbResponse(category);
    return formattedCategory;
  } catch (err) {
    throw new Error(err);
  }
}

async function patchCategoryName (knex, categoryid, newName) {
  try {
    const [ category ] = await knex('categories')
      .where('category_id', categoryid)
      .update({ name: newName })
      .returning('*');

    return category.name;
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteCategory (knex, categoryid) {
  try {
    const [ deletedCategory ] = await knex('categories')
      .where('category_id', categoryid)
      .del()
      .returning('*');

    const formattedCategory = formatDbResponse(deletedCategory);
    return formattedCategory;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getAllCategories,
  postCategory,
  patchCategoryName,
  deleteCategory,
}

