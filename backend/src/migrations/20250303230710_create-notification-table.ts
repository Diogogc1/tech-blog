import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notification', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.integer('user_id').unsigned().references('id').inTable('user').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('status').defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('notification');
}