const DB = module.exports

const knex= require('knex')

const knexConfig = require('../../knexfile');

DB.instance = knex(knexConfig['development'])


