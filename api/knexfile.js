// Update with your config settings.
var DATABASE_URL = "postgres://postgres:postgres@database:5432/db";

module.exports = {
  development: {
    client: "pg",
    connection: DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    }
  }
};
