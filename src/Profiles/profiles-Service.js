const express = require("express");
const xss = require("xss");
const jsonBodyParser = express.json();

const ProfileService = {
   getProfiles(db, s1, s2, s3) {
      return db
         .from("developit_user_skills as skills")
         .select("skills.user_id")
         .where("skills.skill_name", s1)
         .orWhere("skills.skill_name", s2)
         .orWhere("skills.skill_name", s3)
         .then((res) => {
            const userListing = [];
            res.forEach((res) => {
               userListing.push(res.user_id);
            });
            return ProfileService.getAllProfiles(db).whereIn(
               "developit_profiles.user_id",
               userListing
            );
         });
   },

   getAllProfiles(db) {
      return db
         .select(
            "developit_profiles.id",
            "developit_profiles.dev_blurb",
            "developit_profiles.emp_blurb",
            "developit_profiles.user_id",
            "developit_users.nickname",
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
         .join(
            "developit_users",
            "developit_users.id",
            "developit_user_skills.user_id"
         )

         .groupBy(
            "developit_profiles.id",
            "developit_profiles.dev_blurb",
            "developit_profiles.emp_blurb",
            "developit_profiles.user_id",
            "developit_profiles.image",
            "developit_users.nickname"
         );
   },

   getProfileOnly(db) {
      return db
         .from("developit_profiles")
         .join(
            "developit_users",
            "developit_users.id",
            "developit_profiles.user_id"
         )
         .select(
            "developit_profiles.id",
            "developit_profiles.dev_blurb",
            "developit_profiles.emp_blurb",
            "developit_users.nickname",
            "developit_profiles.image"
         );
   },

   getById(db, id) {
      return ProfileService.getAllProfiles(db)
         .where("developit_profiles.user_id", id)
         .first();
   },

   getProfileOnlyById(db, id) {
      return ProfileService.getProfileOnly(db)
         .where("developit_profiles.user_id", id)
         .first();
   },

   insertProfile(db, profile) {
      console.log(profile.user_id);
      return db
         .insert(profile)
         .into("developit_profiles")
         .returning("*")
         .then(([profile]) => profile)
         .then((profile) => ProfileService.getById(db, profile.id));
   },

   updateProfile(db, newProfileFields) {
      return db("developit_profiles as profile")
         .where("profile.user_id", newProfileFields.user_id)
         .update(newProfileFields);
   },

   getAllProjects(db) {
      return db.from("developit_user_projects as offers").select("*");
   },

   insertProject(db, project) {
      return db
         .insert(project)
         .into("developit_user_projects")
         .returning("*")
         .then(([project]) => project)
         .then((project) =>
            ProfileService.getProjectsByDevId(db, project.dev_id)
         );
   },

   getProjectsByDevId(db, id) {
      return ProfileService.getAllProjects(db).where(
         "developit_user_projects.dev_id",
         id
      );
   },
};

module.exports = ProfileService;
