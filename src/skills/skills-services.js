const xss = require("xss");

const skillService = {
   //shows all skills
   getAllSkills(db) {
      return db
         .from("developit_user_skills AS userSkills")
         .distinct("user_id", db.raw("array_agg(skill_name) AS state"))
         .groupBy("user_id");
   },
   //query for skill by user ID
   getById(db, id) {
      return skillService
         .getAllSkills(db)
         .where(" userSkills.user_id", id)
         .first();
   },
   //insert skill here
   insertskill(db, skill) {
      return db
         .insert(skill)
         .into("developit_user_skills")
         .returning("*")
         .then(([skill]) => skill)
         .then((skill) => skillService.getById(db, skill.user_id));
   },

   //insert multiple skills here
   insertskillBatch(db, skillsArray, user_id) {
      const dummy = {
         skill_name: "dummy",
         skill_level: "expert",
         user_id: user_id,
      };
      return db
         .from("developit_user_skills")
         .where("developit_user_skills.user_id", user_id)
         .update(dummy)
         .then(() => {
            db.insert(skillsArray)
               .into("developit_user_skills")
               .returning("*")
               .then(([skills]) => skills)
               .then((skills) => skillService.getById(db, skills.user_id));
         })
         .then(() => {
            return db
               .from("developit_user_skills")
               .where("developit_user_skills.skill_name", dummy.skill_name)
               .delete();
         });
   },

   //update skill here
   updateskill(db, skill) {
      return db
         .from("developit_user_skills")
         .andWhere("developit_user_skills.user_id", user_id)
         .delete()
         .then();
   },

   // Delete skill
   delete(db, user_id, skill) {
      return db
         .from("developit_user_skills")
         .where("developit_user_skills.skill_name", skill)
         .andWhere("developit_user_skills.user_id", user_id)
         .delete();
   },
};

module.exports = skillService;
