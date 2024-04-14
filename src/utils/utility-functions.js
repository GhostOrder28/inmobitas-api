const cloudinary = require('cloudinary').v2;
const { deleteResource, getPicturePublicId } = require('../utils/cloudinary');

const strParseIn = str => {
  if (str) {
    const parsedStr = str.trim()
      .replaceAll(' ', '-')
      .replaceAll('_', '-')
      .toLowerCase();
    return parsedStr;
  } else {
    return null
  }
};

const strParseOut = str => {
  if (str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  } else {
    return null
  }
};

const capFirst = str => {
  if (str) {
    const string = `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
    return string.replaceAll('-', ' ');
  } else {
    return null;
  }
}

const randomNumberGenerator = () => {
  return Date.now() + '-' + Math.round(Math.random() * 1E9)
};

const suffixGenerator = mimeType => {
  return mimeType.substring(mimeType.lastIndexOf('/')+1);
}

const cloudinaryUnsignedUploader = (image, preset) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.unsigned_upload(
      image, 
      preset,
      { cloud_name: "ghost-order" },
      function(error, result) {
        if (error) return reject(err);
        return resolve(result);
      });
  })
}

const pxToMm = (px, dpi) => ((px * 25.4) / dpi)

function formatDbResponse (obj) {
  const keys = Object.keys(obj);
  const formattedResponse = keys.reduce((acc, currentKey) => {
    const camelCased = currentKey.replace(/\_([a-z])/g, function (g) { return g[1].toUpperCase() })
    return { ...acc, [camelCased]: obj[currentKey] }
  }, {});
  return formattedResponse;
}

function sortEntities (arr, key) {
  const clonedArr = [ ...arr ];
  clonedArr.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0
  })
  return clonedArr;
};

async function batchDeletePictures (key, identifiers, userType, knexInstance) {
  try {
    const { userId, estateId, categoryId } = identifiers;

    const value = (
      key === 'category_id' ? categoryId :
      key === 'estate_id' ? estateId :
      null
    )

    const picturesToDelete = await knexInstance('pictures')
      .select('*')
      .where(key, value)
      .returning('*');

    const deletedPicturedFromCloudinary = await picturesToDelete.reduce(async (acc, curr) => {
      const { filename, auto_generated } = curr;

      if (auto_generated) return await acc;

      const small = await deleteResource(getPicturePublicId(userId, estateId, filename, 'small', userType));
      const large = await deleteResource(getPicturePublicId(userId, estateId, filename, 'large', userType));

      return [ ...(await acc), { small, large } ]
    }, [])

    return deletedPicturedFromCloudinary;
  } catch (err) {
    console.error(`there was an error trying to batch delete pictures in cloudinary: ${err}`)
    throw new Error(err)
  }
};

module.exports = {
  strParseIn,
  strParseOut,
  capFirst,
  randomNumberGenerator,
  suffixGenerator,
  cloudinaryUnsignedUploader,
  pxToMm,
  formatDbResponse,
  sortEntities,
  batchDeletePictures,
}
