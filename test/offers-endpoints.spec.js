const knex = require("knex");
const app = require("../src/app");
const helpers = require("./fixtures/test-helpers");

let bearerToken;

describe("Offers Endpoints", function () {
  let db;

  const { testUsers, testOffers } = helpers.makeOffersFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  beforeEach("authorization", () => {
    return supertest(app)
      .post("/api/users")
      .send(testUsers[1])
      .then((createdUserRes) => {
        const alteredUsers = testUsers.filter(
          (user) => user.id !== testUsers[1].id
        );
        helpers.seedUsers(db, testUsers);

        return supertest(app)
          .post("/api/auth/login")
          .send(testUsers[1])
          .then((response) => {
            bearerToken = response.body.authToken;
            return true;
          });
      });
    // log that user in
    // set their bearerToken
  });

  describe(`POST /api/offers`, () => {
    context(`posts an offer`, () => {
      const testOffer = {
        dev_id: 1,
        offer_detail: "New Test Offer",
      };

      it(`successfully posts an offer`, () => {
        return supertest(app)
          .post("/api/offers")
          .set("Authorization", `Bearer ${bearerToken}`)
          .send(testOffer)
          .expect(201)
          .expect((res) => {
            const postedOffer = res.body.pop();

            return postedOffer.dev_id === testOffer.dev_id;
          });
      });
    });
  });

  describe(`GET /offers/dev`, () => {
    context(
      `it retrieves a users offers based on dev_id & logged in user`,
      () => {
        it(`retrieved dev offers`, () => {
          return supertest(app)
            .get("/api/offers/dev")
            .set("Authorization", `Bearer ${bearerToken}`)
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
        response: "Test Response 1",
      };

      it(`responded to an offer`, () => {
        return supertest(app)
          .patch("/api/offers/dev/1")
          .set("Authorization", `Bearer ${bearerToken}`)
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
        it(`retrieved employer offers`, () => {
          return supertest(app)
            .get("/api/offers/emp")
            .set("Authorization", `Bearer ${bearerToken}`)
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
      it(`retrieves the correct offer`, () => {
        return supertest(app)
          .get("/api/offers/1")
          .set("Authorization", `Bearer ${bearerToken}`)
          .expect(200)
          .expect((res) => {
            res.body.id === 1;
          });
      });
    });
  });

  describe(`PATCH /offers/:offer_id`, () => {
    context(`it responds to a users offer`, () => {
      const testUpdate = {
        offer_detail: "Test Details Update 1",
      };

      it(`responded to an offer`, () => {
        return supertest(app)
          .patch("/api/offers/1")
          .set("Authorization", `Bearer ${bearerToken}`)
          .send(testUpdate)
          .expect(204)
          .expect((res) => {
            db.from("developit_offers")
              .select("*")
              .where({ id: 1 })
              .first()
              .then((row) => {
                expect(testResponse.offer_detail).to.eql(row.offer_detail);
              });
          });
      });
    });
  });

  describe(`DELETE /offers/:offer_id`, () => {
    context(`it deletes an offer`, () => {
      it(`deleted the offer`, () => {
        return supertest(app)
          .delete("/api/offers/1")
          .set("Authorization", `Bearer ${bearerToken}`)
          .expect(200)
          .expect((res) => {
            res.body.message === "offer deleted";
          });
      });
    });
  });
});
