const User = require('../models/users.model')

exports.findAllUsers = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available'
    },
  });

  res.status(200).json({
    message: 'The query has been done successfully',
    results: users.length,
    users,
  });
};

exports.createUsers = async (req, res) => {
  const { name, email, password, role } = 
    req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  
  res.status(201).json({
    status: 'success',
    message: 'The user has been created',
    user,
  })
}

exports.findOneUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if(!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User can not be found',
    });
  }

  res.status(200).json({
    status: 'error',
    message: 'Greetings user',
    user,
  })
}

exports.updateUsers = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  const { name, email } = req.body;

  if(!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User can not be found',
    });
  }

  await user.update({
    name,
    email,
  });
  
  res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
  });
};

exports.deleteUsers = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if(!user) {
    return res.status(404).json({
      status: 'error',
      message: `User with id ${id} can not be found`,
    });
  }

  await user.update({
    status: 'disabled',
  });

  res.status(200).json({
    message: 'This user has been deleted',
  })
}

