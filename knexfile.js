// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection:   {
      host : '127.0.0.1',
      port : 5432,
      user : 'consent',
      password : 'consent'
    },
    database : 'consent',
    pool: { min: 1, max: 10 },
    acquireConnectionTimeout: 5000,
    afterCreate: function afterPoolCreate(con, cb) {
      con.query(`SET timezone = '${TIMEZONE}';`, (err) => cb(err, con));
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
