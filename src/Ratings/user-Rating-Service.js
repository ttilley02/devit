const UserRatingService = {
   getRatings(knex) {
      return knex.select("*").from("developit_user_reviews");
   },
   // insertItem(knex, newItem) {
   //     return knex
   //         .insert(newItem)
   //         .into('cart')
   //         .returning('*')
   //         .then(rows => {
   //             return rows[0]
   //         })
   // },
};

module.exports = UserRatingService;
