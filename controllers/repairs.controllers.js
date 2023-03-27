const Repair = require('../models/repairs.model')

exports.findAllRepairs = async (req, res) => {
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
}

exports.createRepairs = async (req, res) => {
  const {date, userId} = req.body;

  const repair = await Repair.create({
    date: new Date(date).toISOString(),
    userId,
  });

  res.status(201).json({
    status: 'success',
    message: 'Your repair has been created',
  })
}

exports.findOneRepair = async (req, res) => {
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
}

exports.updateRepair = async (req, res) => {
  const {id} = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending'
    }
  })

  if(!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The user has not be found',
    });
  }

  await repair.update({
    status: 'completed',
  });

  res.json({
    message: `This id ${id} repair has been updated`,
  })
}

exports.deleteRepair = async (req, res) => {
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
      message: `the id ${id} has not be found`,
    });
  }

  await repair.update({
    status: 'canceled',
  });

  res.json({
    message: 'You deleted your repair'
  })
};