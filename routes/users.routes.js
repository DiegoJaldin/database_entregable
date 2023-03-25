const express = require('express');

const usersControllers = require('./../controllers/users.controllers');

const routerUsers = express.Router();

routerUsers
  .route('/')
  .get(usersControllers.findAllUsers)
  .post(usersControllers.createUsers);

routerUsers
  .route('/:id')
  .get(usersControllers.findOneUser)
  .patch(usersControllers.updateUsers)
  .delete(usersControllers.deleteUsers);
  
module.exports = routerUsers;