const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeUsersArray } = require("./fixtures/user.fixtures");
const { makeProfilesArray } = require("./fixtures/profiles.fixtures");
const { makeSkillsArray } = require("./fixtures/skills.fixtures");
const { makeUserSkillsArray } = require("./fixtures/userSkills.fixtures");
const { makeLevelsArray } = require("./fixtures/levels.fixtures");
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
         "TRUNCATE developit_users, developit_profiles,developit_levels, developit_skills, developit_user_skills RESTART IDENTITY CASCADE"
      )
   );

   afterEach("cleanup", () =>
      db.raw(
         "TRUNCATE developit_users, developit_profiles,developit_levels, developit_skills, developit_user_skills RESTART IDENTITY CASCADE"
      )
   );

   describe("GET /api/profiles TEST", () => {
      context(`Given no profiles`, () => {
         it(`responds with 200 and an empty list`, () => {
            return supertest(app).get("/api/profiles").expect(200);
         });
      });
      context("Given there are profiles in the database", () => {
         const testUsers = makeUsersArray();
         const testProfile = makeProfilesArray();
         const testLevels = makeLevelsArray();
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
                                 .into("developit_levels")
                                 .insert(testLevels)
                                 .then(() => {
                                    return db
                                       .into("developit_user_skills")
                                       .insert(testUserSkills);
                                 });
                           });
                     });
               });
         });

         it("GET /api/profiles responds with 200 and profiles", () => {
            return supertest(app).get("/api/profiles").expect(200);
         });
      });
      context("Given there are profiles in the database", () => {
         const testUsers = makeUsersArray();
         const testProfile = makeProfilesArray();
         const testLevels = makeLevelsArray();
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
                                 .into("developit_levels")
                                 .insert(testLevels)
                                 .then(() => {
                                    return db
                                       .into("developit_user_skills")
                                       .insert(testUserSkills);
                                 });
                           });
                     });
               });
         });

         it("GET /api/profiles responds with 200 and SEARCHED profiles", () => {
            return supertest(app)
               .get("/api/profiles/Node.js/wed/fds")
               .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
               .expect(200);
         });
      });

      context("Add profile info the database", () => {
         const testUsers = makeUsersArray();

         const profileParams = {
            dev_blurb:
               "check me out.  I am a great coder and I know everything",
            projects: "Creating a MySpace clone",
            user_id: 2,
            image: "__",
         };

         beforeEach("insert users", () => {
            return db.into("developit_users").insert(testUsers);
         });

         it("POST /api/profiles/add responds with 204 and posted profile", () => {
            console.log(
               "Authorization",
               authHelper.makeAuthHeader(testUsers[0])
            );
            return supertest(app)
               .post("/api/profiles/add")
               .send(profileParams)
               .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
               .expect(204);
         });
      });
      context("update a in the database", () => {
         const testUsers = makeUsersArray();
         const testProfile = makeProfilesArray();

         const profileParams = {
            emp_blurb: "I AM AN UPDATE!! LETS GET IT!!",
            projects: "WORD PROCESSING APP",
            user_id: 2,
            image: "newlinktomystuff.jpg",
         };

         beforeEach("insert users", () => {
            return db
               .into("developit_users")
               .insert(testUsers)
               .then(() => {
                  return db.into("developit_profiles").insert(testProfile);
               });
         });

         it("PATCH /api/profiles responds with 204 and updated profile", () => {
            return supertest(app)
               .patch(`/api/profiles/${profileParams.user_id}`)
               .send(profileParams)
               .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
               .expect(204);
         });
      });

      context("profile by ID", () => {
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

         const profId = 1;

         it("GET /api/profiles responds with 200 profile by ID", () => {
            return supertest(app)
               .get(`/api/profiles/user/${profId}`)
               .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
               .expect(200);
         });
      });
   });
});
