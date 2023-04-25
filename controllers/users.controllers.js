const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcryptjs = require('bcryptjs');
const jwt = require('../utils/jwt');
const AppError = require("../utils/appError");

exports.loginUser = catchAsync(
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        status: 'available',
      },
    });

    if (!user) {
      return next(
        new AppError(
          'The user could not be found',
          404
        )
      );
    }

    if (
      !(await bcryptjs.compare(
        password,
        user.password
      ))
    ) {
      return next(
        new AppError(
          'Incorrect email or password',
          401
        )
      );
    };

    const token = await jwt(user.id);

    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
);

exports.findAllUsers = catchAsync(async (req, res) => {
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
}); 

exports.createUsers =catchAsync(async (req, res) => {
  const { name, email, password, role } = 
    req.body;

  const salt = await bcryptjs.genSalt(10);

  const encryptedPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
    role,
  });

  const token = await jwt(user.id);
  
  res.status(201).json({
    status: 'success',
    message: 'The user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  })
}); 

exports.findOneUser =catchAsync( async (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
  })
});

exports.updateUsers = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({
    name,
    email,
  });
  
  res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
  });
}); 

exports.deleteUsers =catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({
    status: 'disabled'
  });
  res.status(200).json({
    message: 'This user has been deleted',
  })
}); 

