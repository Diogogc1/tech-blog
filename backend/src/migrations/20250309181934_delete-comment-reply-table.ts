import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('comment_reply')
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable('comment_reply', (table) => {
    table.increments('id').primary()
    table.text('content').notNullable()
    table.integer('comment_id').unsigned().references('id').inTable('comment')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('status').defaultTo(true)
  })
}
