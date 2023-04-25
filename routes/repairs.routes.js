const express = require('express');

const repairsControllers = require('./../controllers/repairs.controllers');

const authMiddleware = require('../middleware/auth.middleware');

const validRepair = require('../middleware/repair.middleware.js');

const routerRepair = express.Router();

routerRepair.use(authMiddleware.protect);
routerRepair.use(authMiddleware.restrictTo('employee'));

routerRepair
  .route('/')
  .get(repairsControllers.findAllRepairs)
  .post(repairsControllers.createRepairs);
  
routerRepair
  .route('/:id')
  .get(repairsControllers.findOneRepair)
  .patch(validRepair.validExistRepair, repairsControllers.updateRepair)
  .delete(validRepair.validExistRepair, repairsControllers.deleteRepair);

module.exports = routerRepair;
