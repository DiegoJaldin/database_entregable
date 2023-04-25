const RepairModel = require('./repairs.model');
const UserModel = require('./users.model');

const initModel = () => {
  UserModel.hasMany(RepairModel)
  RepairModel.belongsTo(UserModel)
};

module.exports = initModel;