require('dotenv').config();
// require('dotenv').config({ path: '/Users/marlo/devit/.env' })
console.log(process.env.DATABASE_URL)

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === 'test')
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
}
