const xss = require("xss");

const imagesService = {
   updateImage(db, image) {
      return db("developit_profiles as profile")
         .where("profile.user_id", image.user_id)
         .update(image);
   },
};

module.exports = imagesService;
