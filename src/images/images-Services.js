const xss = require("xss");

const imagesService = {
   sendMessage(db, imageLink) {
      return db
         .insert(imageLink)
         .into("developit_profiles")
         .where("developit_profiles.user_id", imageLink.user_id);
   },
};

module.exports = imagesService;
