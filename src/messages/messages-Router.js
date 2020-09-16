const express = require("express");
const path = require("path");
const messageService = require("./messages-Services");
const { requireAuth } = require("../middleware/jwt-auth");
const { json } = require("express");

const messagesRouter = express.Router();
const jsonBodyParser = express.json();

//Add a message
messagesRouter
  .route("/")
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { receiver_id, message } = req.body;
    const newMessageFields = { receiver_id, message };
    for (const [key, value] of Object.entries(newMessageFields))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });

        newMessageFields.sender_id = 1;

    //service object to post note
    messageService
      .sendMessage(req.app.get("db"), newMessageFields)
      .then(() => {
        return res.status(204).json({
          message: "message sent!",
        });
      })
      .catch(next);
  });


  // get all offers specific to dev/recipient
messagesRouter
.route("/myMessages")
.get(requireAuth, (req, res, next) => {
    messageService.getById(database, req.user.id)
    .then((message) => {
        res.json(message);
      })
      .catch(next);
});

module.exports = messagesRouter;