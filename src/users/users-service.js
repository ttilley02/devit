const xss = require("xss");
const bcrypt = require("bcryptjs");
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
const profileService = require("../Profiles/profiles-Service");

const UsersService = {
   //get a customized user object that has all elements in it.
   getUsers(db) {
      const profiles = profileService.getAllProfiles(db);
      return profiles;
   },
   //service objec tot check if user name exist
   hasUserWithUserName(db, nickname) {
      return db("developit_users")
         .where({ nickname })
         .first()
         .then((user) => !!user);
   },
   //insert a user
   insertUser(db, newUser) {
      return db
         .insert(newUser)
         .into("developit_users")
         .returning("*")
         .then(([user]) => user);
   },

   //password validation with criteria spelled out for easy editting
   validatePassword(password) {
      if (password.length < 8) {
         return "Password must be longer than 8 characters";
      }
      if (password.length > 56) {
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
         profile: user.profile,
         id: user.id,
         nickname: xss(user.nickname),
         date_created: new Date(user.date_created),
      };
   },
};

module.exports = UsersService;
