const UserRatingService = {
   getRatings(knex) {
      return knex.select("*").from("developit_user_reviews");
   },
   insertRating(knex, newRating) {
       return knex
           .insert(newRating)
           .into('ratings')
           .returning('*')
           .then(rows => {
               return rows[0]
           })
   },
};

module.exports = UserRatingService;
