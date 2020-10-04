const express = require("express");
const UserRatingService = require("./user-Rating-Service");
const UserRatingsRouter = express.Router();

//Get user ratings
UserRatingsRouter.route("/").get((req, res, next) => {
   UserRatingService.getRatings(req.app.get("db"))
      .then((items) => {
         res.json(items);
      })
      .catch(next);
});

module.exports = UserRatingsRouter;
