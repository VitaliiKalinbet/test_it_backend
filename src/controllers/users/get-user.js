// const User = require('../../models/users/usersModel');

// const getUser = (request, response) => {
//   const id = request.params.id;
//   const sendResponse = (user) => {
//     response.status(200);
//     response.json(user);
//   };

//   const findUser = User.findById(id);

//   Promise.all(findUser)
//     .then(sendResponse)
//     .catch(err => {
//       console.error(err);
//     });
// };

// module.exports = getUser;
