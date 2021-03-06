const xss = require("xss");

//This gets messages for users and includes meta info for the front end to sort and organize messages based
//on timing.  Additionally allows for them to use an image.
const messagesService = {
   getById(db, id) {
      return db
         .from("developit_messages as message")

         .select(
            "message.message",
            "message.sender_id",
            "message.receiver_id",
            "message.date_created",
            "message.image"
         )
         .where(function () {
            this.where("sender_id", id).orWhere("receiver_id", id);
         });
   },

   // Lets user send message with corresponding receiever and sender ID.
   //Grabs the iamge from the sender first then makes a SQL call to post.
   sendMessage(db, newMessage) {
      return db
         .from("developit_profiles as profile")
         .select("profile.image")
         .where("profile.user_id", newMessage.sender_id)
         .returning("*")
         .then(([res]) => res)
         .then((res) => {
            newMessage.image = res.image;
            db.insert(newMessage)
               .into("developit_messages")
               .returning("*")
               .then(([message]) => message)
               .then((message) =>
                  messagesService.getById(db, message.sender_id)
               );
         });
   },
};

module.exports = messagesService;
