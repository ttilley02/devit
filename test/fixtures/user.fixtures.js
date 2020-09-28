function makeUsersArray() {
   return [
      {
         id: 1,
         nickname: "testperson1",
         profile: true,
         password: "password",
      },
      {
         id: 2,
         nickname: "testperson2",
         profile: true,
         password: "password",
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
