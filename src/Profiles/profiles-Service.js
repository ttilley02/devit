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


  getAllProfiles(db) {
    return db
      .from("developit_profiles AS profile")
      .join("developit_user_skills AS userSkills", "profile.user_id", "userSkills.user_id")
      .select(
        "profile.id",
        "profile.blurb",
        "profile.projects",
        "profile.user_id",
        "userSkills.skill_name"

      )
        .groupBy("profile.id", "userSkills.skill_name")
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
