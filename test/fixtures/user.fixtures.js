function makeUsersArray() {
   return [
      {
         id: 1,
         nickname: "testperson1",
         profile: true,
         password:
            "$2a$12$Rnk30PlaoMJC2X3XdU0vDuqmS7qghoCaVzjAv91EaEri1FEnl1STi",
      },
      {
         id: 2,
         nickname: "testperson2",
         profile: true,
         password:
            "$2a$12$dsEVWnhGBVRt8V1cwTxXMOC9Q/0IU7B1m1orWGKoon7OeCYrAt5SK",
      },
      {
         id: 3,
         nickname: "testperson3",
         profile: true,
         password: "password",
      },
      {
         id: 4,
         nickname: "testperson4",
         profile: true,
         password: "password",
      },
      {
         id: 5,
         nickname: "testperson5",
         profile: false,
         password: "password",
      },
      {
         id: 6,
         nickname: "testperson6",
         profile: false,
         password: "password",
      },
      {
         id: 7,
         nickname: "testperson7",
         profile: false,
         password: "password",
      },
   ];
}

module.exports = {
   makeUsersArray,
};
