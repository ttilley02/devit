const express = require("express");
const path = require("path");
const profileService = require("./profiles-Service");
const { requireAuth } = require("../middleware/jwt-auth");
const { json } = require("express");

const profilesRouter = express.Router();
const jsonBodyParser = express.json();

//get profiles from the search parameters
profilesRouter.route("/").get(
   (req, res, next) => {
    profileService
      //service object
      .getAllProfiles(req.app.get("db"))
      .then((profiles) => {
        res.json(profiles);
      })
            .catch(next);
  }
);

profilesRouter.route('/:profile_id').get(
  (req, res, next) => {

   profileService
     //service object
     .getById(req.app.get("db"), req.params.profile_id )
     .then((profile) => {
       res.json(profile);
     })
     .catch(next);

 }
);

profilesRouter
  .route("/")
  .get( requireAuth, jsonBodyParser, (req, res, next) => {
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


//This endpoint will shoudld be called when the user wants to add more info about themselves.
//This would include a picture, a blurb and projects that they are associated with/working on
profilesRouter.route("/add").post(requireAuth, jsonBodyParser, (req, res, next) => {
  const { blurb, projects } = req.body;
  const profileParams = { blurb, projects };
  if (profileParams === 0) {
    return res.status(400).json({
      error: {
        message: `say something about yourself!`,
      },
    });
  }


  profileParams.user_id = req.user.id;

  profileService
  //service object
    .insertProfile(req.app.get("db"),profileParams)
    .then(() => {
      return res.status(204).json({
        message: "profile posted"
      });
    })
    .catch(next);

});

//updating an existing profile
profilesRouter.route("/").patch(requireAuth, jsonBodyParser, (req, res, next) => {
  const { blurb, projects } = req.body;
  const profileParams = { blurb, projects };
  if (profileParams === 0) {
    return res.status(400).json({
      error: {
        message: `no changes made yet!`,
      },
    });
  }


  profileParams.user_id = req.user.id;

  profileService
  //service object
    .updateProfile(req.app.get("db"),profileParams)
    .then(() => {
      return res.status(204).json({
        message: "profile updated"
      });
    })
    .catch(next);

});



module.exports = profilesRouter;
