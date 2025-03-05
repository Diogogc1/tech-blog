import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('comment', (table) => {
    table.integer('user_id').unsigned().references('id').inTable('user')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('comment', (table) => {
    table.dropColumn('user_id')
  })
}
