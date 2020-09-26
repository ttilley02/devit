const { json } = require("express");
const express = require("express");
const path = require("path");
const UsersService = require("./users-service");
const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.post("/", jsonBodyParser, (req, res, next) => {
   const { password, nickname } = req.body;
   for (const field of ["nickname", "password"])
      if (!req.body[field])
         return res.status(400).json({
            error: `Missing '${field}' in request body`,
         });

   const passwordError = UsersService.validatePassword(password);

   if (passwordError) return res.status(400).json({ error: passwordError });

   //check if user name is already taken
   //if not then insert said user and hash their password
   //profile
   UsersService.hasUserWithUserName(req.app.get("db"), nickname)
      .then((hasUserWithUserName) => {
         if (hasUserWithUserName)
            return res.status(400).json({ error: `nickname already taken` });

         return UsersService.hashPassword(password).then((hashedPassword) => {
            const newUser = {
               nickname,
               password: hashedPassword,
               date_created: "now()",
               //prfile
            };

            return UsersService.insertUser(req.app.get("db"), newUser).then(
               (user) => {
                  res.status(201)
                     .location(path.posix.join(req.originalUrl, `/${user.id}`))
                     .json(UsersService.serializeUser(user));
               }
            );
         });
      })
      .catch(next);
});

usersRouter.get("/", jsonBodyParser, (req, res, next) => {
   UsersService.getUsers(req.app.get("db"))
      .then((user) => {
         res.json(user);
      })
      .catch(next);
});

module.exports = usersRouter;
