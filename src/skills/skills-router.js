const express = require("express");
const skillService = require("./skills-services");
const { requireAuth } = require("../middleware/jwt-auth");

const skillsRouter = express.Router();
const jsonBodyParser = express.json();

// retrieve skills
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

//add skills to a user.  Used in the front for user profile changes
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
               message: "skill added",
            });
         })
         .catch(next);
   });

//add skills to a user.  Used in the front for user profile changes
skillsRouter
   .route("/batch/:user_id")
   .patch(requireAuth, jsonBodyParser, (req, res, next) => {
      const skills = req.body;
      const sk = skills;
      const skillArray = sk.map((skill) => ({
         ...skill,
         user_id: req.user.id,
      }));

      skillService
         .insertskillBatch(req.app.get("db"), skillArray, req.user.id)
         .then(() => {
            return res.status(204).json({
               message: "skill added",
            });
         })
         .catch(next);
   });
//  Delete a skill from a user
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
