import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('comment', (table) => {
    table.integer('article_id').unsigned().references('id').inTable('article')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('comment', (table) => {
    table.dropColumn('article_id')
  })
}
