const { knexGuest, knexMain } = require('../knex/knex-config');
const { AuthenticationError } = require('../errors/db-errors');

function checkUserType (req, res, next) {
  try {
    console.log("either one of these shouldn't be undefined to pass the usertype check");
    console.log('req.user: ', req.user);
    console.log('req.params.usertype: ', req.params.usertype);

    const userTypeInCookie = req.user?.userType || null;
    const userTypeInParams = req.params?.usertype || null;
    console.log('checking user type...');

    if (userTypeInCookie === 'guest' || userTypeInParams === 'guest') {
      console.log('user is guest');
      req.knexInstance = knexGuest;  
    } else if (userTypeInCookie === 'normal' || userTypeInParams === 'normal'){
      console.log('user is normal')
      req.knexInstance = knexMain;
    } else {
      throw new AuthenticationError('user type is undefined, please log in again');
    }
    next();
  } catch (err) {
    if (err instanceof AuthenticationError) next(err);
    console.log(`there is an error when checking user type: ${err}`);
  }
}

module.exports = {
  checkUserType
}
