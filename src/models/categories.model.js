const { formatDbResponse } = require('../utils/utility-functions');
const { deletePicture } = require('../models/pictures.model');

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

    const formattedCategory = formatDbResponse(category);
    return formattedCategory.name;
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteCategory (knex, userid, estateid, categoryid, userType) {
  try {
    // delete first the pictures

    const picturesToDelete = await knex.select('picture_id')
      .from('pictures')
      .where('category_id', categoryid)
      .returning('*');

    console.log('picturesToDelete: ', picturesToDelete);

    const params = { userid, estateid };

    picturesToDelete.forEach(async (p) => {
      params.pictureid = p.picture_id
      await deletePicture(knex, params, userType);
    })

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

