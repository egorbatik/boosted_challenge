
const CONSENTS ='consents';

exports.up = async function(knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  return knex.schema.createTable(CONSENTS, (table)=>{
    table.uuid('id').defaultTo(knex.raw("(uuid_generate_v1())"));
    table.string('name').notNullable();
    table.string('consent_url').notNullable();
    table.string('created_at').notNullable().defaultTo(knex.raw(`TO_CHAR(NOW()::date, 'yyyy/mm/dd')`));
    table.integer('version').notNullable().defaultTo(0)
  })
};


exports.down = async function(knex) {
  await knex.schema.dropTable(CONSENTS);
  return knex.schema.raw('DROP EXTENSION "uuid-ossp"')
};
