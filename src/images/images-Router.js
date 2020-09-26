const express = require("express");
const path = require("path");
const imageService = require("./images-Services");
const { requireAuth } = require("../middleware/jwt-auth");
const { json } = require("express");

const imagesRouter = express.Router();
const jsonBodyParser = express.json();

//Add a image
imagesRouter.route("/").post(requireAuth, jsonBodyParser, (req, res, next) => {
   const { imageLink } = req.body;
   const newImageFields = { imageLink };

   newImageFields.sender_id = req.user.id;

   //service object to post note
   imageService
      .postimage(req.app.get("db"), newImageFields)
      .then(() => {
         return res.status(204).json({
            image: "image uploaded",
         });
      })
      .catch(next);
});

// get all offers specific to dev/recipient
imagesRouter.route("/myimages").get(requireAuth, (req, res, next) => {
   imageService
      .getById(database, req.user.id)
      .then((image) => {
         res.json(image);
      })
      .catch(next);
});

module.exports = imagesRouter;
