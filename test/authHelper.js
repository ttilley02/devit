const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.nickname,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('developit_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('developit_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}


module.exports = {
  makeAuthHeader,
  seedUsers
};
