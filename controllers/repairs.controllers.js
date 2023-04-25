const Repair = require('../models/repairs.model')
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = catchAsync( async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pendind'
    },
  });

  res.status(200).json({
    message: 'This query has been done successfully',
    results: repairs.length,
    repairs,
  })
}) 

exports.createRepairs = catchAsync( async (req, res) => {
  const {date, description, motorsNumber, userId} = req.body;

  const repair = await Repair.create({
    date: new Date(date).toISOString(),
    userId,
    description,
    motorsNumber,
  });

  res.status(201).json({
    status: 'success',
    message: 'Your repair has been created',
    repair,
  })
}) 

exports.findOneRepair = catchAsync( async (req, res) => {
  const {id} = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    }
  });

  if(!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair has not be found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'This is your repair',
    repair,
  })
}) 

exports.updateRepair = catchAsync( async (req, res) => {

  const {repair} = req;

  await repair.update({
    status: 'completed',
  });

  res.json({
    message: `This repair has been updated`,
  })
}); 

exports.deleteRepair = catchAsync( async (req, res) => {
  const {repair} = req;

  await repair.update({
    status: 'canceled',
  });

  res.json({
    message: 'You deleted your repair'
  })
}); 