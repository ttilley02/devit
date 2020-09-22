const xss = require("xss");
const userSkillsFixtures = require("../../test/fixtures/userSkills.fixtures");

const skillService = {

  getAllSkills(db) {
    return db
      .from("developit_user_skills AS userSkills")
      .distinct(
        
        "userSkills.user_id",
        "userSkills.skill_name"
      );
  },



  getById(db, id) {
    return skillService.getAllSkills(db).where(" userSkills.user_id", id).first();
  },

  insertskill(db, skill,user_id) {
      console.log(user_id)
    return db
      .insert(skill)
      .into("developit_user_skills")
      .returning("*")
      .then(([skill]) => skill)
      .then((skill => skillService.getById(db, skill.user_id))
      )

    


  },
  
  delete(db, user_id) {
    return db.from("developit_user_skills").where({ user_id }).delete();
  },


};

module.exports = skillService;
