const knexMain = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_CONNECTION_STRING
});

const knexGuest = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_GUEST_CONNECTION_STRING
});

module.exports = {
  knexMain,
  knexGuest
}
