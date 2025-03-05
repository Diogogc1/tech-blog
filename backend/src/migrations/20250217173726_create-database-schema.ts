import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.string('password').unique().notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('status').defaultTo(true)
  })

  await knex.schema.createTable('tag', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('status').defaultTo(true)
  })

  await knex.schema.createTable('article', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('content').notNullable()
    table.integer('author_id').unsigned().references('id').inTable('user')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('status').defaultTo(true)
  })

  await knex.schema.createTable('comment', (table) => {
    table.increments('id').primary()
    table.text('content').notNullable()
    table.integer('user_id').unsigned().references('id').inTable('user')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('status').defaultTo(true)
  })

  await knex.schema.createTable('comment_reply', (table) => {
    table.increments('id').primary()
    table.text('content').notNullable()
    table.integer('comment_id').unsigned().references('id').inTable('comment')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('status').defaultTo(true)
  })

  await knex.schema.createTable('article_tag', (table) => {
    table.increments('id').primary()
    table.integer('article_id').unsigned().references('id').inTable('article')
    table.integer('tag_id').unsigned().references('id').inTable('tag')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('status').defaultTo(true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('article_tag')
  await knex.schema.dropTableIfExists('comment_reply')
  await knex.schema.dropTableIfExists('comment')
  await knex.schema.dropTableIfExists('article')
  await knex.schema.dropTableIfExists('tag')
  await knex.schema.dropTableIfExists('user')
}
