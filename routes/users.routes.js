const express = require('express');

const usersControllers = require('./../controllers/users.controllers');

const authMiddleware = require('../middleware/auth.middleware');

const ExistUser = require('../middleware/user.middleware');

const routerUsers = express.Router();

routerUsers.post('/', usersControllers.createUsers);
routerUsers.post('/login', usersControllers.loginUser);

routerUsers.use(authMiddleware.protect);

routerUsers
  .route('/')
  .get(usersControllers.findAllUsers);

routerUsers
  .route('/:id')
  .get(ExistUser.validExistUser, usersControllers.findOneUser)
  .patch(ExistUser.validExistUser, authMiddleware.protectAccountOwner, usersControllers.updateUsers)
  .delete(ExistUser.validExistUser, authMiddleware.protectAccountOwner, usersControllers.deleteUsers);

module.exports = routerUsers;
