const express = require("express");
const skillService = require("./skills-services");
const { requireAuth } = require("../middleware/jwt-auth");

const skillsRouter = express.Router();
const jsonBodyParser = express.json();

skillsRouter
   .route("/:skill_id")
   .get(requireAuth, jsonBodyParser, (req, res, next) => {
      skillService
         //service object
         .getById(req.app.get("db"), req.params.skill_id)
         .then((skill) => {
            res.json(skill);
         })
         .catch(next);
   });

skillsRouter
   .route("/add/:user_id")
   .post(requireAuth, jsonBodyParser, (req, res, next) => {
      const { user_id, skill_name, skill_level } = req.body;
      const sk = { user_id, skill_name, skill_level };

      sk.user_id = req.params.user_id;

      skillService
         .insertskill(req.app.get("db"), sk, req.params.user_id)
         .then(() => {
            return res.status(204).json({
               message: "skill updated",
            });
         })
         .catch(next);
   });

//IN PROGRESS OF BUG FIXING
// skillsRouter
// .route("/update/:user_id/:skill_name/")
// .patch( jsonBodyParser, (req, res, next) => {

//   const {user_id ,skill_name, skill_level } = req.body;
//   const sk = {user_id, skill_name, skill_level };

//   sk.user_id = req.params.user_id

//   skillService
//   .updateSkill(req.app.get("db"),sk, req.params.user_id,req.params.skill)
//   .then(() => {
//     res.status(204).json({
//       message: "updated!"
//     });
//   })
//   .catch(next);
// });

skillsRouter
   .route("/delete/:user_id/:skill")
   .delete(requireAuth, jsonBodyParser, (req, res, next) => {
      skillService
         .delete(req.app.get("db"), req.params.user_id, req.params.skill)
         .then(() => {
            res.status(204).json({
               message: "deleted!",
            });
         })
         .catch(next);
   });

module.exports = skillsRouter;
