const express = require("express");
const path = require("path");
const imageService = require("./images-Services");
const { requireAuth } = require("../middleware/jwt-auth");
const { json } = require("express");

const imagesRouter = express.Router();
const jsonBodyParser = express.json();

//update an image
imagesRouter.route("/").patch(requireAuth, jsonBodyParser, (req, res, next) => {
   const { image } = req.body;
   const newImageFields = { image };

   newImageFields.user_id = req.user.id;

   //service object to post note
   imageService
      .updateImage(req.app.get("db"), newImageFields)
      .then(() => {
         return res.status(204).json({
            image: "image uploaded",
         });
      })
      .catch(next);
});

module.exports = imagesRouter;
