function makeUserSkillsArray() {
   return [
      { user_id: 1, skill_name: "Node.js", skill_level: "entry" },
      { user_id: 2, skill_name: "C++", skill_level: "entry" },
      { user_id: 3, skill_name: "HTML", skill_level: "entry" },
      { user_id: 4, skill_name: "C++", skill_level: "entry" },
      { user_id: 5, skill_name: "Postgres", skill_level: "entry" },
   ];
}

module.exports = {
   makeUserSkillsArray,
};
