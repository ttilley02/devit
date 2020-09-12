const xss = require("xss");
const bcrypt = require("bcryptjs");
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  //service objec tot check if user name exist
  hasUserWithUserName(db, user_name) {
    return db("devit_users")
      .where({ user_name })
      .first()
      .then((user) => !!user);
  },
  //insert a user
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("devit_users")
      .returning("*")
      .then(([user]) => user);
  },

  //password validation with criteria spelled out for easy editting
  validatePassword(password) {
    if (password.length < 8) {
      return "Password must be longer than 8 characters";
    }
    if (password.length > 72) {
      return "Password must be less than 56 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty spaces";
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return "Password must contain 1 upper case, lower case, number and special character";
    }
    return null;
  },
  //hash a password here
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },

  //serialization when needed.  Remember that test may need this added as well.
  serializeUser(user) {
    return {
      id: user.id,
      full_name: xss(user.full_name),
      user_name: xss(user.user_name),
      nickname: xss(user.nick_name),
      date_created: new Date(user.date_created)
    };
  }
};

module.exports = UsersService;
