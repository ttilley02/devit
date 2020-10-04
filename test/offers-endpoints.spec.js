const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeUsersArray } = require("./fixtures/user.fixtures");
const { makeProfilesArray } = require("./fixtures/profiles.fixtures");
const { makeOffersArray } = require("../test/fixtures/test-helpers");
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

   describe(`POST /api/offers`, () => {
      context(`posts an offer`, () => {
         const testUsers = makeUsersArray();
         const testProfile = makeProfilesArray();

         const testOffer = {
            image: "avatar.jpg",
            emp_name: 2,
            dev_id: 1,
            payrate: 35,
            offer_info: "New Test Offer Info",
            offer_detail: "New Test Offer Detail",
         };
         beforeEach("insert users", () => {
            return db
               .into("developit_users")
               .insert(testUsers)
               .then(() => {
                  return db.into("developit_profiles").insert(testProfile);
               });
         });

         it(`successfully posts an offer`, () => {
            return supertest(app)
               .post("/api/offers")
               .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
               .send(testOffer)
               .expect(201)
               .expect((res) => {
                  const postedOffer = res.body.pop();

                  return postedOffer.offer_info === testOffer.offer_info;
               });
         });
      });

      describe(`GET /offers/dev`, () => {
         context(
            `it retrieves a users offers based on dev_id & logged in user`,
            () => {
               const testUsers = makeUsersArray();
               const testProfile = makeProfilesArray();

               beforeEach("insert users", () => {
                  return db
                     .into("developit_users")
                     .insert(testUsers)
                     .then(() => {
                        return db
                           .into("developit_profiles")
                           .insert(testProfile);
                     });
               });

               it(`retrieved dev offers`, () => {
                  return supertest(app)
                     .get("/api/offers/dev")
                     .set(
                        "Authorization",
                        authHelper.makeAuthHeader(testUsers[0])
                     )
                     .expect(200)
                     .expect((res) => {
                        testUsers[1].id === res.body.dev_id;
                     });
               });
            }
         );
      });

      describe(`PATCH /offers/dev/:offer_id`, () => {
         context(`it responds to a users offer`, () => {
            const testResponse = {
               response: true,
            };

            const testUsers = makeUsersArray();
            const testProfile = makeProfilesArray();
            const testOffers = makeOffersArray();

            beforeEach("insert users", () => {
               return db
                  .into("developit_users")
                  .insert(testUsers)
                  .then(() => {
                     return db.into("developit_profiles").insert(testProfile);
                  })
                  .then(() => {
                     return db.into("developit_offers").insert(testOffers);
                  });
            });

            it(`responded to an offer`, () => {
               return supertest(app)
                  .patch("/api/offers/dev/1")
                  .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
                  .send(testResponse)
                  .expect(204)
                  .expect((res) => {
                     db.from("developit_offers")
                        .select("*")
                        .where({ id: 1 })
                        .first()
                        .then((row) => {
                           expect(testResponse.response).to.eql(row.response);
                        });
                  });
            });
         });
      });

      describe(`GET /offers/emp`, () => {
         context(
            `it retrieves a users offers based on employer_id & logged in user`,
            () => {
               const testUsers = makeUsersArray();
               const testProfile = makeProfilesArray();
               const testOffers = makeOffersArray();

               beforeEach("insert users", () => {
                  return db
                     .into("developit_users")
                     .insert(testUsers)
                     .then(() => {
                        return db
                           .into("developit_profiles")
                           .insert(testProfile);
                     })
                     .then(() => {
                        return db.into("developit_offers").insert(testOffers);
                     });
               });

               it(`retrieved employer offers`, () => {
                  return supertest(app)
                     .get("/api/offers/emp")
                     .set(
                        "Authorization",
                        authHelper.makeAuthHeader(testUsers[0])
                     )
                     .expect(200)
                     .expect((res) => {
                        testUsers[1].id === res.body.employer_id;
                     });
               });
            }
         );
      });

      describe(`GET /offers/:offer_id`, () => {
         context(`it retrieves an offer based on its id`, () => {
            const testUsers = makeUsersArray();
            const testProfile = makeProfilesArray();
            const testOffers = makeOffersArray();

            beforeEach("insert users", () => {
               return db
                  .into("developit_users")
                  .insert(testUsers)
                  .then(() => {
                     return db.into("developit_profiles").insert(testProfile);
                  })
                  .then(() => {
                     return db.into("developit_offers").insert(testOffers);
                  });
            });
            it(`retrieves the correct offer`, () => {
               return supertest(app)
                  .get("/api/offers/1")
                  .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
                  .expect(200)
                  .expect((res) => {
                     res.body.id === 1;
                  });
            });
         });
      });
   });

   describe(`PATCH /offers/:offer_id`, () => {
      context(`it updates the offer details`, () => {
         const testResponse = {
            payrate: 50,
            offer_info: "Test Info Update 1",
            offer_detail: "Test Details Update 1",
         };
         const testUsers = makeUsersArray();
         const testProfile = makeProfilesArray();
         const testOffers = makeOffersArray();

         beforeEach("insert users", () => {
            return db
               .into("developit_users")
               .insert(testUsers)
               .then(() => {
                  return db.into("developit_profiles").insert(testProfile);
               })
               .then(() => {
                  return db.into("developit_offers").insert(testOffers);
               });
         });

         it(`updated the offer`, () => {
            return supertest(app)
               .patch("/api/offers/1")
               .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
               .send(testResponse)
               .expect(204)
               .expect((res) => {
                  db.from("developit_offers")
                     .select("*")
                     .where({ id: 1 })
                     .first()
                     .then((row) => {
                        expect(testResponse.offer_detail).to.eql(
                           row.offer_detail
                        );
                        expect(testResponse.offer_info).to.eql(row.offer_info);
                        expect(testResponse.payrate).to.eql(row.payrate);
                     });
               });
         });
      });
   });

   describe(`DELETE /offers/:offer_id`, () => {
      context(`it deletes an offer`, () => {
         const testUsers = makeUsersArray();
         const testProfile = makeProfilesArray();
         const testOffers = makeOffersArray();

         beforeEach("insert users", () => {
            return db
               .into("developit_users")
               .insert(testUsers)
               .then(() => {
                  return db.into("developit_profiles").insert(testProfile);
               })
               .then(() => {
                  return db.into("developit_offers").insert(testOffers);
               });
         });
         it(`deleted the offer`, () => {
            return supertest(app)
               .delete("/api/offers/1")
               .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
               .expect(200)
               .expect((res) => {
                  res.body.message === "offer deleted";
               });
         });
      });
   });
});
