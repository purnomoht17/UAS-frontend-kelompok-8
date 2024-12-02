/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("tours", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    name: {
      type: "varchar(100)",
      notNull: true,
    },
    duration: {
      type: "integer",
      notNull: true,
    },
    max_group_size: {
      type: "integer",
      notNull: true,
    },
    difficulty: {
      type: "varchar(50)",
      notNull: true,
    },
    ratings_average: {
      type: "numeric(3,2)",
      default: 0.0,
    },
    ratings_quantity: {
      type: "integer",
      default: 0,
    },
    price: {
      type: "integer",
      notNull: true,
    },
    summary: {
      type: "text",
      notNull: true,
    },
    description: {
      type: "text",
    },
    image_cover: {
      type: "varchar(255)",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("tours");
};
