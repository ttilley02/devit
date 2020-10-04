const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeUsersArray } = require("./fixtures/user.fixtures");
const { makeProfilesArray } = require("./fixtures/profiles.fixtures");
const authHelper = require("./authHelper");

describe("ratings/reviews Endpoints", function () {
   let db;

   before("make knex instance", () => {
      db = knex({
         client: "pg",
         connection: process.env.TEST_DATABASE_URL,
      });
      app.set("db", db);
   });

   after("disconnect from db", () => db.destroy());

   before("clean the table", () =>
      db.raw(
         "TRUNCATE developit_users, developit_profiles, developit_skills, developit_user_skills RESTART IDENTITY CASCADE"
      )
   );

   afterEach("cleanup", () =>
      db.raw(
         "TRUNCATE developit_users, developit_profiles, developit_skills, developit_user_skills RESTART IDENTITY CASCADE"
      )
   );

   describe("GET /api/ratings TEST", () => {
      context("should yield a rating of sorts", () => {
         const testUsers = makeUsersArray();
         const testProfile = makeProfilesArray();

         beforeEach("insert users", () => {
            return db
               .into("developit_users")
               .insert(testUsers)
               .then(() => {
                  return db.into("developit_profiles").insert(testProfile);
               });
         });

         it("GET /api/ratings responds with 200 and ratings", () => {
            return supertest(app)
               .get("/api/ratings")
               .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
               .expect(200);
         });
      });
   });
});
