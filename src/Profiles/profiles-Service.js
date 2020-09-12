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

  // getAllUserCards(db, user) {
  //   return db
  //     .from("vocabulab_cards AS card")
  //     .join("vocabulab_notes AS notes", "card.id", "notes.card_id")
  //     .distinct(
  //       "card.id",
  //       "card.spa_content",
  //       "card.eng_content",
  //       "card.date_created",
  //       "card.difficulty",
  //       "notes.note"
  //     )
  //     .where("notes.user_id", user);
  // },

  // getById(db, id) {
  //   return cardsService.getAllCards(db).where("card.id", id).first();
  // },

  // getNotesForCard(db, card_id) {
  //   return db
  //     .from("vocabulab_notes AS note")
  //     .select(
  //       "note.note",
  //       "note.date_created",
  //       db.raw(
  //         `json_strip_nulls(
  //           row_to_json(
  //             (SELECT tmp FROM (
  //               SELECT
  //                 usr.id,
  //                 usr.user_name,
  //                 usr.full_name,
  //                 usr.nickname,
  //                 usr.date_created,
  //                 usr.date_modified
  //             ) tmp)
  //           )
  //         ) AS "user"`
  //       )
  //     )
  //     .where("note.card_id", card_id)
  //     .leftJoin("vocabulab_users AS usr", "note.user_id", "usr.id");
  // },

  // getNotesForCard(db, card_id) {
  //   return db
  //     .from("vocabulab_notes AS note")
  //     .select(
  //       "note.note",
  //       "note.date_created",
  //       db.raw(
  //         `json_strip_nulls(
  //           row_to_json(
  //             (SELECT tmp FROM (
  //               SELECT
  //                 usr.id,
  //                 usr.user_name,
  //                 usr.full_name,
  //                 usr.nickname,
  //                 usr.date_created,
  //                 usr.date_modified
  //             ) tmp)
  //           )
  //         ) AS "user"`
  //       )
  //     )
  //     .where("note.card_id", card_id)
  //     .leftJoin("vocabulab_users AS usr", "note.user_id", "usr.id");
  // },

  // favCard(db, newNoteFields) {
  //   return db
  //     .insert(newNoteFields)
  //     .into("vocabulab_notes")
  //     .returning("*")
  //     .then(([note]) => note)
  //     .then((note) => cardsService.getById(db, newNoteFields.card_id));
  // },

  // insertCard(db, newCard) {
  //   return db
  //     .insert(newCard)
  //     .into("vocabulab_notes")
  //     .returning("*")
  //     .then(([card]) => card)
  //     .then((card) => cardsService.getById(db, card.id));
  // },

  // serializeCard(card) {
  //   return {
  //     id: card.id,
  //     spa_content: card.spa_content,
  //     eng_content: card.eng_content,
  //     date_created: new Date(card.date_created),
  //     difficulty: card.difficulty,
  //     number_of_notes: Number(card.number_of_noteents) || 0,
  //     note: card.note
  //   };
  // },

  // serializeCardNote(note) {
  //   const { user } = note;
  //   return {
  //     card_id: note.card_id,
  //     note: xss(note.note),
  //     date_created: new Date(note.date_created),
  //     user: {
  //       id: user.id,
  //       user_name: user.user_name,
  //       full_name: user.full_name,
  //       nickname: user.nickname,
  //       date_created: new Date(user.date_created),
  //       date_modified: new Date(user.date_modified) || null
  //     }
  //   };
  // }
};

module.exports = ProfileService;
