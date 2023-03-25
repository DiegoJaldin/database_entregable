const express = require('express');

const repairsControllers = require('./../controllers/repairs.controllers')

const routerRepair = express.Router();

routerRepair
  .route('/')
  .get(repairsControllers.findAllRepairs)
  .post(repairsControllers.createRepairs);

routerRepair
  .route('/:id')
  .get(repairsControllers.findOneRepair)
  .patch(repairsControllers.updateRepair)
  .delete(repairsControllers.deleteRepair);

module.exports = routerRepair;