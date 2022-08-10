const { Sequelize } = require("sequelize");

const stackSchema = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  frontend: {
    type: Sequelize.STRING,
  },
  backend: {
    type: Sequelize.STRING,
  },
  database: {
    type: Sequelize.STRING,
  },
  userid: {
    type: Sequelize.UUID,
  },
};

module.exports = stackSchema;
