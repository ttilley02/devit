const express = require("express");
const UserRatingService = require("./user-Rating-Service");
// const xss = require('xss')
const UserRatingsRouter = express.Router();
const jsonParser = express.json();

UserRatingsRouter.route("/").get((req, res, next) => {
   UserRatingService.getRatings(req.app.get("db"))
      .then((items) => {
         res.json(items);
      })
      .catch(next);
});

module.exports = UserRatingsRouter;
