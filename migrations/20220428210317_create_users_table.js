export const up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("phone").notNullable();
    table.string("email").notNullable();
    table.string("address").notNullable();
    table.string("city").notNullable();
    table.boolean("twoFactorIsSet").notNullable();
    table.boolean("biometricsIsSet").notNullable();
    table.boolean("notificationsActive").notNullable();
    table.integer("modules_completed").notNullable();
    table.integer("security_score").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("users");
};
