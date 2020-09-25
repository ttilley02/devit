const xss = require("xss");
const userSkillsFixtures = require("../../test/fixtures/userSkills.fixtures");

const skillService = {

  getAllSkills(db) {
    return db
      .from("developit_user_skills AS userSkills")
      .distinct(
        
        "user_id",
        db.raw("array_agg(skill_name) AS state")
      )
      .groupBy("user_id");
  },



  getById(db, id) {
    return skillService.getAllSkills(db).where(" userSkills.user_id", id).first();
  },

  insertskill(db, skill) {
    console.log(skill)
    return db
      .insert(skill)
      .into("developit_user_skills")
      .returning("*")
      .then(([skill]) => skill)
      .then((skill => skillService.getById(db, skill.user_id))
      )

    


  },
  
  
  // updateSkill(db, skill, user_id, skill_name) {
  //   console.log(skill)
    
  //   return db
  //     .from("developit_user_skills")
  //     .where("developit_user_skills.skill_name" , skill_name  )
  //     .andWhere("developit_user_skills.user_id", user_id  )
  //     .update(skill);
  // },


  delete(db, user_id , skill) {
    return db
    .from("developit_user_skills")
    .where( "developit_user_skills.skill_name" , skill  )
    .andWhere("developit_user_skills.user_id" , user_id  )
    .delete();
  },


};

module.exports = skillService;
