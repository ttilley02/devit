const express = require("express");
const AuthService = require("../middleware/Auth-service.js");

const authRouter = express.Router();
const jsonBodyParser = express.json();

//User login endpoint
authRouter.post("/login", jsonBodyParser, (req, res, next) => {
  const { nickname, password } = req.body;
  const loginUser = { nickname, password };

  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res
        .status(400)
        .json({ error: `Missing '${key}' in request body` });

  //Auth Verification
  AuthService.getUserWithUserName(req.app.get("db"), loginUser.nickname)
    .then((dbUser) => {
      if (!dbUser || dbUser === null) {
        return res
          .status(400)
          .json({ error: "Incorrect nickname or password" });
      }

      return AuthService.comparePassword(
        loginUser.password,
        dbUser.password
      ).then((passwordsMatch) => {
        if (!passwordsMatch) {
          return res
            .status(400)
            .json({ error: "Incorrect nickname or password" });
        }

        const sub = dbUser.nickname;
        const payload = { user_id: dbUser.id };
        res.send({
          authToken: AuthService.createJWT(sub, payload),
        });
      });
    })
    .catch(next);
});

module.exports = authRouter;
