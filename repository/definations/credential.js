const { Sequelize } = require("sequelize");

const credentialSchema = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  userid: {
    type: Sequelize.UUID,
  },
};

module.exports = credentialSchema;
