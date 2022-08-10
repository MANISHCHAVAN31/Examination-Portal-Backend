const { Sequelize } = require("sequelize");

const technologySchema = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
};

module.exports = technologySchema;
