require("dotenv").config();

const knex = require("knex");
const app = require("./app");
const { PORT, TEST_DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: TEST_DATABASE_URL
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
