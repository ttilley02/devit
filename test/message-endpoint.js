const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeUsersArray } = require("./fixtures/user.fixtures");
const { makeProfilesArray } = require("./fixtures/profiles.fixtures");
const { makeMessagesArray } = require("./fixtures/messages.fixtures");
const authHelper = require("./authHelper");

describe("message Endpoints", function () {
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

  describe("POST /api/messages TEST", () => {

    context("sending a message should yield...", () => {
      const testUsers = makeUsersArray();
      const testProfile = makeProfilesArray();
      const testMessages = makeMessagesArray();

      const sampleMessage = {
        sender_id: 1,
        receiver_id: 5,
        message:
          "Testing my new messsge hopefully will turn out as great as this day!!!",
      };

      beforeEach("insert users", () => {
        return db
          .into("developit_users")
          .insert(testUsers)
          .then(() => {
            return db
              .into("developit_profiles")
              .insert(testProfile)
              .then(() => {
                return db.into("developit_messages").insert(testMessages);
              });
          });
      });

      it("POST /api/messages responds with 204 and message", () => {
        return supertest(app)
          .post("/api/messages")
          .send(sampleMessage)
          .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
          .expect(204)
        });
    });
  });
});
