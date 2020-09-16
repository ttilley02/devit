const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      nickname: "testuser1",
      password: "Testpass@1",
      profile: true,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      date_modified: new Date("2029-01-23T16:28:32.615Z"),
    },
    {
      nickname: "testuser2",
      password: "Testpass@2",
      profile: false,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      date_modified: new Date("2029-01-23T16:28:32.615Z"),
    },
    {
      nickname: "testuser3",
      password: "Testpass@3",
      profile: true,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      date_modified: new Date("2029-01-23T16:28:32.615Z"),
    },
    {
      nickname: "testuser4",
      password: "Testpass@4",
      profile: false,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      date_modified: new Date("2029-01-23T16:28:32.615Z"),
    },
    {
      nickname: "testuser5",
      password: "Testpass@5",
      profile: true,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      date_modified: new Date("2029-01-23T16:28:32.615Z"),
    },
  ];
}

function makeOffersArray(users) {
  return [
    {
      id: 1,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      employer_id: 1,
      dev_id: 3,
      offer_detail: "Test Offer 1",
    },
    {
      id: 2,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      employer_id: 4,
      dev_id: 3,
      offer_detail: "Test Offer 2",
    },
    {
      id: 3,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      employer_id: 4,
      dev_id: 3,
      offer_detail: "Test Offer 3",
    },
    {
      id: 4,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      employer_id: 1,
      dev_id: 5,
      offer_detail: "Test Offer 4",
    },
  ];
}

function makeExpectedOffer(offers, offerId) {
  return offers.filter((offer) => offer.id === offerId);
}

function makeOffersFixtures() {
  const testUsers = makeUsersArray();
  const testOffers = makeOffersArray(testUsers);
  return { testUsers, testOffers };
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
        developit_offers
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(
            `ALTER SEQUENCE developit_offers_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('developit_offers_id_seq', 0)`),
        ])
      )
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));

  return db
    .into("developit_users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('developit_users_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    )
    .catch((error) => console.log(error));
}

function seedOffers(db, users, offers) {
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
    await trx.into("developit_offers").insert(offers);
    // update the auto sequence to match the forced id values
    await trx.raw(`SELECT setval('developit_offers_id_seq', ?)`, [
      offers[offers.length - 1].id,
    ]);
  });
}

function seedMaliciousOffer(db, user, offer) {
  return seedUsers(db, [user]).then(() =>
    db.into("developit_offers").insert([offer])
  );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeOffersArray,
  makeExpectedOffer,
  makeOffersFixtures,
  cleanTables,
  seedUsers,
  seedOffers,
  seedMaliciousOffer,
  makeAuthHeader,
};
