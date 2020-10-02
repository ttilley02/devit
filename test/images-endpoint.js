const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeUsersArray } = require("./fixtures/user.fixtures");
const { makeProfilesArray } = require("./fixtures/profiles.fixtures");
const authHelper = require("./authHelper");

describe("image Endpoints", function () {
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

   describe("PATCH /api/images TEST", () => {
      context("sending a image should yield...", () => {
         const testUsers = makeUsersArray();
         const testProfile = makeProfilesArray();

         const sampleimage = {
            user_id: 1,
            image: "LINKTOMYIMAGE.JPG",
         };

         beforeEach("insert users", () => {
            return db
               .into("developit_users")
               .insert(testUsers)
               .then(() => {
                  return db.into("developit_profiles").insert(testProfile);
               });
         });

         it("update /api/images responds with 204 and image", () => {
            return supertest(app)
               .patch("/api/images")
               .send(sampleimage)
               .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
               .expect(204);
         });
      });
   });
});
