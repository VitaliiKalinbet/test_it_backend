// const User = require('../../models/users/usersModel');

// const deleteUser = (request, response) => {
//   const id = request.params.id;

//   const sendResponse = (user) => {
//     response.status(200);
//     response.json(user);
//   };

//   User
//     .findById(id)
//     .remove()
//     .then(sendResponse)
//     .catch(err => {
//       console.error(err);
//     });
// };

// module.exports = deleteUser;
