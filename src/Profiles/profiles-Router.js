const express = require("express");
const path = require("path");
const profileService = require("./profiles-Service");
const { requireAuth } = require("../middleware/jwt-auth");
const { json } = require("express");

const profilesRouter = express.Router();
const jsonBodyParser = express.json();

//get profiles from the search parameters
profilesRouter.route("/").get(jsonBodyParser, (req, res, next) => {
  profileService
    //service object
    .getAllProfiles(req.app.get("db"))
    .then((profiles) => {
      res.json(profiles);
    })
    .catch(next);
});

profilesRouter
  .route("/user/:user_id")
  .get(requireAuth, jsonBodyParser, (req, res, next) => {
    profileService
      //service object
      .getById(req.app.get("db"), req.params.user_id)
      .then((profile) => {
        res.json(profile);
      })
      .catch(next);
  });

profilesRouter
  .route("/:skill/:skill2/:skill3")
  .get(jsonBodyParser, (req, res, next) => {
    profileService
      //service object
      .getProfiles(
        req.app.get("db"),
        req.params.skill,
        req.params.skill2,
        req.params.skill3
      )
      .then((profiles) => {
        res.json(profiles);
      })
      .catch(next);
  });

//This endpoint will shoudld be called when the user wants to add more info about themselves.
//This would include a picture, a blurb and projects that they are associated with/working on
profilesRouter
  .route("/add")
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { dev_blurb, emp_blurb, image } = req.body;
    const profileParams = { dev_blurb, emp_blurb, image };
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
      .insertProfile(req.app.get("db"), profileParams)
      .then(() => {
        return res.status(204).json({
          message: "profile posted",
        });
      })
      .catch(next);
  });

//updating an existing profile
profilesRouter
  .route("/:user_id")
  .patch(requireAuth, jsonBodyParser, (req, res, next) => {
    const { dev_blurb, emp_blurb, image } = req.body;
    const profileParams = { dev_blurb, emp_blurb, image };
    if (profileParams === 0) {
      return res.status(400).json({
        error: {
          message: `no changes made yet!`,
        },
      });
    }

    profileParams.user_id = req.params.user_id;

    profileService
      //service object
      .updateProfile(req.app.get("db"), profileParams)
      .then(() => {
        return res.status(204).json({
          message: "profile updated",
        });
      })
      .catch(next);
  });

// retrieve a users featured projects for their profile
profilesRouter
  .route("/:user_id/projects")
  .get(requireAuth, (req, res, next) => {
    profileService
      //service object
      .getProjectsByDevId(req.app.get("db"), req.params.user_id)
      .then((projects) => {
        res.json(projects);
      })
      .catch(next);
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { details } = req.body;
    const projectDetails = { details };

    if (!projectDetails) {
      return res.status(400).json({
        error: {
          message: `Missing project details`,
        },
      });
    }

    projectDetails.dev_id = req.user.id;

    profileService
      .insertProject(req.app.get("db"), projectDetails)
      //service object
      .then(() => {
        return res.status(204).json({
          message: "project(s) posted",
        });
      })
      .catch(next);
  });

module.exports = profilesRouter;
