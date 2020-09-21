const xss = require("xss");

const ProfileService = {
  getProfiles(db, searchParams) {
    
    return db
      .from("developit_profiles AS profile")
      .join("developit_user_skills AS userSkills", "profile.user_id", "userSkills.user_id")
      .distinct(
        "profile.id",
        "profile.blurb",
        "profile.projects",
        "profile.user_id",
        "userSkills.skill_name"
      )

      .where("userSkills.skill_name", searchParams.skill || searchParams.skill2 || searchParams.skill3);
  },


//  skillsGroup 
 getProfileSkillsArray(db,user) {
    return db
      .select(
        "developit_user_skills.user_id",
        db.raw('ARRAY_AGG(developit_user_skills.skill_name) as skills'))
        .from("developit_user_skills")
        .where("developit_user_skills.user_id", 5)
        .groupBy("developit_user_skills.user_id");
        

  },


  getAllProfiles(db) {
    return db
      .from("developit_profiles AS profile")
      .join("developit_user_skills AS userSkills", "profile.user_id", "userSkills.user_id")
      .join("developit_users AS users", "profile.user_id", "users.id")
      .distinct(
        "profile.id",
        "profile.blurb",
        "profile.projects",
        "profile.user_id",
        "userSkills.skill_name",
        "users.nickname",
        "profile.image"
       
      );
    
      
  },

  insertProfile(db, profile) {
    return db
      .insert(profile)
      .into("developit_profiles")
      .returning("*")
      .then(([profile]) => profile)
      .then((profile => ProfileService.getById(db, profile.id))
      )
  },

  getById(db, id) {
    return ProfileService.getAllProfiles(db).where("profile.id", id).first();
  },

  updateProfile(db, newProfileFields) {
        
    return db("developit_profiles as profile")
      .where("profile.user_id",newProfileFields.user_id)
      .update(newProfileFields);
  },



};

module.exports = ProfileService;
