import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid())
    table.uuid('session_id').index()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.boolean('is_diet').notNullable()
    table.date('date').notNullable()
    table.time('time').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
