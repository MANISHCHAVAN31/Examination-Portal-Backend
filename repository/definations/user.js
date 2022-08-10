const { Sequelize } = require("sequelize");

userSchema = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  },
};

module.exports = userSchema;
