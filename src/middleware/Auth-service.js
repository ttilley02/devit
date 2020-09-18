const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const AuthService = {
  //service object that retrives name of user
  getUserWithUserName(db, nickname) {
    return db("developit_users").where({ nickname }).first();
  },

  //uses bcrypt to compare the password against the exist hash algo
  comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  },

  //Basic token creation.  Keeping this here for now just in case there has to be use of basic token but will
  //likely delete later.
  parseBasicToken(token) {
    return Buffer.from(token, "base64").toString().split(":");
  },

  //Create a JWT instance with paylod and required arguments
  createJWT(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: "HS256",
    });
  },

  //verify the token against the current algo
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ["HS256"],
    });
  },
};

module.exports = AuthService;
