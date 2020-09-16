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
        "profile.user_id"
      )

      .where("userSkills.skill_name", searchParams.skill || searchParams.skill2|| searchParams.skill3);
  },


  getAllProfiles(db) {
    return db
      .from("developit_profiles AS profile") 
      .select(
        "profile.id",
        "profile.blurb",
        "profile.projects",
        "profile.user_id"

      )
        .groupBy("profile.id")
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
    return db
      .from("developit_profiles as profile")
      .select(
        "profile.blurb",
        "profile.projects"
        
        )
        .where("profile.id" , id)
  },


};

module.exports = ProfileService;
