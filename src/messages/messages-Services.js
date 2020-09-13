const xss = require("xss");

const messagesService = {
    getById(db, id) {
        return db
          .from("developit_messages as message")
          .select(
            "message.message",
            "message.sender_id",
            "message.receiver_id"
            )
            .where("message.sender_id" , id)
      },
    sendMessage(db, newMessage) {
    return db
      .insert(newMessage)
      .into("developit_messages")
      .returning("*")
      .then(([message]) => message)
      .then((message) => messagesService.getById(db, message.sender_id));
  },

};

module.exports = messagesService;

