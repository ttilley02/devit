function makeMessagesArray() {
  return [
    {
      sender_id: 1,
      receiver_id: 2,
      message: "testing this messsage part 1",
    },
    {
      sender_id: 2,
      receiver_id: 5,
      message: "testing this messsage part 2",
    },
    {
      sender_id: 3,
      receiver_id: 4,
      message: "testing this messsage part 3",
    },
    {
      sender_id: 4,
      receiver_id: 3,
      message: "testing this messsage part 4",
    },
    {
      sender_id: 5,
      receiver_id: 2,
      message: "testing this messsage part 5",
    },
    {
      sender_id: 5,
      receiver_id: 1,
      message: "testing this messsage part 5",
    },
    {
      sender_id: 5,
      receiver_id: 4,
      message: "testing this messsage part 5",
    },
  ];
}

module.exports = {
  makeMessagesArray
};
