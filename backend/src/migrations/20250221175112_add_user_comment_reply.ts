import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('comment_reply', (table) => {
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('comment_reply', (table) => {
    table.dropColumn('user_id');
  });
}
