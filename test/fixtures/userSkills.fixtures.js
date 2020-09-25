function makeUserSkillsArray() {
  return [
    { user_id: 1, skill_name: [["GGG","entry"],["JJJ","expert"],["LLL","mid"]] },
    { user_id: 2, skill_name: [["GGG2","entry2"]] },
    { user_id: 3, skill_name: [["GGG3","entry3"]] },
    { user_id: 4, skill_name: [["GGG4","entry4"]] },
    { user_id: 5, skill_name: [["GGG5","entry5"]] },
  ];
}

module.exports = {
  makeUserSkillsArray,
};
