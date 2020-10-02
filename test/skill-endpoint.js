const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeUsersArray } = require("./fixtures/user.fixtures");
const { makeProfilesArray } = require("./fixtures/profiles.fixtures");
const { makeSkillsArray } = require("./fixtures/skills.fixtures");
const { makeUserSkillsArray } = require("./fixtures/userSkills.fixtures");
const { makeLevelsArray } = require("./fixtures/levels.fixtures");
const authHelper = require("./authHelper");

describe("skill Endpoints", function () {
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
      "TRUNCATE developit_users, developit_profiles,developit_levels, developit_skills, developit_user_skills RESTART IDENTITY CASCADE"
    )
  );

  afterEach("cleanup", () =>
    db.raw(
      "TRUNCATE developit_users, developit_profiles,developit_levels, developit_skills, developit_user_skills RESTART IDENTITY CASCADE"
    )
  );

  describe("GET /api/skills TEST", () => {
    context(`Given no skills`, () => {
      it(`responds with 404 and an not found`, () => {
        return supertest(app).get("/api/skills").expect(404);
      });
    });
    context("Given there are skills in the database", () => {
      const testUsers = makeUsersArray();
      const testProfile = makeProfilesArray();
      const testSkills = makeSkillsArray();
      const testUserSkills = makeUserSkillsArray();
      const testLevels = makeLevelsArray();

      beforeEach("insert users", () => {
        return db
          .into("developit_users")
          .insert(testUsers)
          .then(() => {
            return db
              .into("developit_profiles")
              .insert(testProfile)
              .then(() => {
                return db
                  .into("developit_levels")
                  .insert(testLevels)
                  .then(() => {
                    return db
                      .into("developit_skills")
                      .insert(testSkills)
                      .then(() => {
                        return db
                          .into("developit_user_skills")
                          .insert(testUserSkills);
                      });
                  });
              });
          });
      });

      it("GET /api/skills/:id responds with 200 and profiles", () => {
        const testSkill = {
          user_id: 1,
        };
        return supertest(app)
          .get(`/api/skills/${testSkill.user_id}`)
          .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
          .expect(200);
      });
    });
  });
  describe("POST /api/skills/add/:user_id TEST", () => {
    context("Given there are users in the database", () => {
      const testUsers = makeUsersArray();
      const testProfile = makeProfilesArray();
      const testSkills = makeSkillsArray();
      const testUserSkills = makeUserSkillsArray();
      const testLevels = makeLevelsArray();

      beforeEach("insert users", () => {
        return db
          .into("developit_users")
          .insert(testUsers)
          .then(() => {
            return db
              .into("developit_profiles")
              .insert(testProfile)
              .then(() => {
                return db
                  .into("developit_levels")
                  .insert(testLevels)
                  .then(() => {
                    return db
                      .into("developit_skills")
                      .insert(testSkills)
                      .then(() => {
                        return db
                          .into("developit_user_skills")
                          .insert(testUserSkills);
                      });
                  });
              });
          });
      });

      it("GET /api/skills/:id responds with 200 and profiles", () => {
        const testSkill = {
          user_id: 1,
          skill_name: "Postgres",
          skill_level: "mid",
        };
        return supertest(app)
          .post(`/api/skills/add/${testSkill.user_id}`)
          .send(testSkill)
          .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
          .expect(204);
      });
    });
  });
});
