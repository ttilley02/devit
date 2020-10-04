require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const offersRouter = require("./Offers/offers-router");
const profilesRouter = require("./Profiles/profiles-Router");
const messagesRouter = require("./messages/messages-Router");
const ratingsRouter = require("./Ratings/User-Ratings");
const skillsRouter = require("./skills/skills-router");
const imagesRouter = require("./images/images-Router");

const app = express();

app.use(
   morgan(NODE_ENV === "production" ? "tiny" : "common", {
      skip: () => NODE_ENV === "test",
   })
);
app.use(cors());
app.use(helmet());
app.use(express.json());

//Routers that reference service objects
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api/offers", offersRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/reviews", ratingsRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/images", imagesRouter);
app.use("/api/ratings", ratingsRouter);

app.use(function errorHandler(error, req, res, next) {
   let response;
   if (NODE_ENV === "production") {
      response = { error: { message: "server error" } };
   } else {
      console.error(error);
      response = { message: error.message, error };
   }
   res.status(500).json(response);
});

module.exports = app;
