const { Sequelize } = require("sequelize");

const testSchema = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  technologyid: {
    type: Sequelize.UUID,
  },
  technologyname: {
    type: Sequelize.STRING,
  },
  userid: {
    type: Sequelize.UUID,
  },
  score: {
    type: Sequelize.NUMBER,
  },
  outofscore: {
    type: Sequelize.NUMBER,
  },
  isattempted: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  questions: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    default: [],
  },
};

module.exports = testSchema;
