const { Sequelize } = require('sequelize')

const db = Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'D13g0',
  database: 'usersbikes',
  port: '5432',
  logging: false,
});

module.exports = { db };