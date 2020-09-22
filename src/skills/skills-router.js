const express = require("express");
const skillService = require("./skills-services");
const { requireAuth } = require("../middleware/jwt-auth");


const skillsRouter = express.Router();
const jsonBodyParser = express.json();


skillsRouter.route('/:skill_id').get(
  (req, res, next) => {

   skillService
     //service object
     .getById(req.app.get("db"), req.params.skill_id )
     .then((skill) => {
       res.json(skill);
     })
     .catch(next);

 }
);



skillsRouter.route("/:user_id").patch( jsonBodyParser, (req, res, next) => {

    const { user_id ,skill_name } = req.body;
    const sk = {user_id ,skill_name };
    
    sk.user_id = req.params.user_id
 

    skillService
    //service object call for update
    .delete(req.app.get("db"), req.params.user_id)
    .then(() => {
        skillService
   

    .insertskill(req.app.get("db"),sk, sk.user_id)
    .then(() => {
      return res.status(204).json({
        message: "skill updated"
      });
    })
})
    .catch(next);
 

});

skillsRouter
  .route("/:user_id")
  .delete( jsonBodyParser, (req, res, next) => {
    skillService
      .delete(req.app.get("db"), req.params.user_id)
      .then(() => {
        res.status(204).json({
          message: "deleted!"
        });
      })
      .catch(next);
  });



module.exports = skillsRouter;
