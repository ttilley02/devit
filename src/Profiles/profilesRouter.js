const express = require("express");
const path = require("path");
const profileService = require("./cards-service");
const { requireAuth } = require("../middleware/jwt-auth");
const { json } = require("express");

const profilesRouter = express.Router();
const jsonBodyParser = express.json();

//get profiles from the search parameters
cardsRouter.route("/").get(requireAuth, jsonBodyParser, (req, res, next) => {
  const { skillsNeeded, skillsWanted } = req.body;
  const profileSearchParams = { skillsNeeded, skillsWanted };
  if (skillsNeeded === 0) {
    return res.status(400).json({
      error: {
        message: `must specify skill(s) needed`,
      },
    });
  }
  profileService
    .getProfiles(req.app.get("db"),profileSearchParams, req.user.id)
    .then((profiles) => {
      res.json(profiles);
    })
    .catch(next);
});


module.exports = profilesRouter;
