const express = require("express");
const path = require("path");
const profileService = require("./profiles-Service");
const { requireAuth } = require("../middleware/jwt-auth");
const { json } = require("express");

const profilesRouter = express.Router();
const jsonBodyParser = express.json();

//get profiles from the search parameters
profilesRouter.route("/").get(
  /*requireAuth*/ (req, res, next) => {
    profileService
      //service object
      .getAllProfiles(req.app.get("db"))
      .then((profiles) => {
        res.json(profiles);
      })
      .catch(next);
  }
);

profilesRouter
  .route("/find")
  .get(/*requireAuth*/ jsonBodyParser, (req, res, next) => {
    const { skill ,skill2,skill3 } = req.body;
    const profileSearchParams = { skill,skill2,skill3 };

    if (profileSearchParams === 0) {
      return res.status(400).json({
        error: {
          message: `skill must not have been selected`,
        },
      });
    }
    profileService
      //service object
      .getProfiles(req.app.get("db"), profileSearchParams)
      .then((profiles) => {
        res.json(profiles);
      })
      .catch(next);
  });

// profilesRouter.route("/").post(requireAuth, jsonBodyParser, (req, res, next) => {
//   const { image } = req.body;
//   const profileSearchParams = { image };
//   if (!image) {
//     return res.status(400).json({
//       error: {
//         message: `image needed`,
//       },
//     });
//   }
//   profileService
//   //service object
//     .uploadImage(req.app.get("db"),profileSearchParams, req.user.id)
//     .then(() => {
//       return res.status(204).json({
//         message: "image posted!"
//       });
//     })
//     .catch(next);

// });

module.exports = profilesRouter;
