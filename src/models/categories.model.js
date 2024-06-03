const { formatDbResponse, batchDeletePictures, formatRequestBody } = require('../utils/utility-functions');

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
    body = formatRequestBody(body)
    const [ newCategory ] = await knex('categories')
      .insert({ ...body, estate_id: estateid  })
      .returning('*');

    const formattedCategory = formatDbResponse(newCategory);

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

async function patchCategoriesPosition (knex, estateid) {
  try {
    const trxResult = await knex.transaction(async (trx) => {
      const categories = await trx('categories')
        .select('*')
        .where('estate_id', estateid)
        .returning('*');

      const ordered = categories.sort((a, b) => {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
        return 0
      })

      const positionUpdated = ordered.map((c, idx) => ({ category_id: c.category_id, position: idx + 1 }));

      const updatedCategories = await Promise.all(positionUpdated.map(async c => {
        const [ updatedCategory ] = await trx('categories')
          .update({ position: c.position })
          .where('category_id', c.category_id)
          .returning('*');

        return updatedCategory
      }));

      const formattedCategories = updatedCategories.map(c => formatDbResponse(c));

      return formattedCategories;
    })

    return trxResult;
  } catch (err) {
    console.error(`there was an error when trying to update the position of some categories: ${err}`)
  }
};

async function deleteCategory (knex, identifiers, userType) {
  try {
    const { categoryId } = identifiers;

    // always first delete related pictures from cloudinary
    const deletedPicturesFromCloudinary = await batchDeletePictures('category_id', identifiers, userType, knex)
    console.log('deletedPicturesFromCloudinary: ', deletedPicturesFromCloudinary);

    const [ deletedCategory ] = await knex('categories')
      .where('category_id', categoryId)
      .del()
      .returning('*');

    return Number(deletedCategory.category_id);
  } catch (err) {
    throw err
  }
}

module.exports = {
  getAllCategories,
  postCategory,
  patchCategoryName,
  patchCategoriesPosition,
  deleteCategory,
}

