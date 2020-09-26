const express = require("express");
const xss = require("xss");
const jsonBodyParser = express.json();

const ProfileService = {
   getProfiles(db, s1, s2, s3) {
      return db
         .from("developit_user_skills")
         .join(
            "developit_profiles",
            "developit_profiles.id",
            "developit_user_skills.user_id"
         )
         .distinct(
            "developit_profiles.user_id",
            db.raw("array_agg(skill_name ) as skills"),
            db.raw("array_agg(skill_level ) as level"),
            "developit_profiles.image"
         )
         .groupBy(
            "developit_profiles.id",
            "developit_profiles.blurb",
            "developit_profiles.projects",
            "developit_profiles.user_id",
            "developit_profiles.image"
         )
         .where("developit_user_skills.skill_name", s1)
         .orWhere("developit_user_skills.skill_name", s2)
         .orWhere("developit_user_skills.skill_name", s3);
   },

   getAllProfiles(db) {
      return db
         .select(
            "developit_profiles.id",
            "developit_profiles.blurb",
            "developit_profiles.projects",
            "developit_profiles.user_id",
            db.raw("array_agg(skill_name) as skills"),
            db.raw("array_agg(skill_level) as level"),
            "developit_profiles.image"
         )
         .from("developit_user_skills")
         .join(
            "developit_profiles",
            "developit_profiles.user_id",
            "developit_user_skills.user_id"
         )

         .groupBy(
            "developit_profiles.id",
            "developit_profiles.blurb",
            "developit_profiles.projects",
            "developit_profiles.user_id",
            "developit_profiles.image"
         );
   },

   getById(db, id) {
      return ProfileService.getAllProfiles(db)
         .where("developit_profiles.user_id", id)
         .first();
   },

   insertProfile(db, profile) {
      return db
         .insert(profile)
         .into("developit_profiles")
         .returning("*")
         .then(([profile]) => profile)
         .then((profile) => ProfileService.getById(db, profile.id));
   },

   updateProfile(db, newProfileFields) {
      console.log(newProfileFields);

      return db("developit_profiles as profile")
         .where("profile.user_id", newProfileFields.user_id)
         .update(newProfileFields);
   },
};

module.exports = ProfileService;
