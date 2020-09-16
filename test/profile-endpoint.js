const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeUsersArray } = require("./fixtures/user.fixtures");
const { makeProfilesArray } = require("./fixtures/profiles.fixtures");
const { makeSkillsArray } = require("./fixtures/skills.fixtures");
const { makeUserSkillsArray } = require("./fixtures/userSkills.fixtures");
const authHelper = require("./authHelper");

describe("Profile Endpoints", function () {
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

  describe("GET /api/profiles TEST", () => {
    context(`Given no profiles`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/profiles").expect(200, []);
      });
    });
    context("Given there are profiles in the database", () => {
        const testUsers = makeUsersArray();
        const testProfile = makeProfilesArray();
        const testSkills = makeSkillsArray();
        const testUserSkills = makeUserSkillsArray();
  
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
  
        it("GET /api/profiles responds with 200 and profiles", () => {
          return supertest(app)
            .get("/api/profiles")
            .expect(200)
            .expect((res) => {
              expect(res.body.blurb).to.eql(testProfile.blurb);
              expect(res.body.projects).to.eql(testProfile.projects);
            });
        });
      });
    context("Given there are profiles in the database", () => {
      const testUsers = makeUsersArray();
      const testProfile = makeProfilesArray();
      const testSkills = makeSkillsArray();
      const testUserSkills = makeUserSkillsArray();


      const searchParams = {
          skill: "Node.js",
          skill2: "C++",
          skill3: "HTML"
      }

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

      it("GET /api/profiles responds with 200 and SEARCHED profiles", () => {
        return supertest(app)
          .get("/api/profiles/find")
          .send(searchParams)
          .expect(200)
          .expect((res) => {
            expect(res.body.blurb).to.eql(testProfile.blurb);
            expect(res.body.projects).to.eql(testProfile.projects);
          });
      });
    });
    context("Add profile info the database", () => {
      const testUsers = makeUsersArray();
      const testProfile = makeProfilesArray();
  


      const profileParams = {
          blurb: "check me out.  I am a great coder and I know everything",
          projects: "Creating a MySpace clone",
          user_id: 2
      }

      beforeEach("insert users", () => {
        return db
          .into("developit_users")
          .insert(testUsers)
      });

      it("POST /api/profiles/add responds with 204 and posted profile", () => {
        return supertest(app)
          .post("/api/profiles/add")
          .send(profileParams)
          .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
          .expect(204)
          .expect((res) => {
            expect(res.body.blurb).to.eql(testProfile.blurb);
            expect(res.body.projects).to.eql(testProfile.projects);
            expect(res.body.user_id).to.eql(testProfile.user_id);
          });
      });
    });
  });
});
