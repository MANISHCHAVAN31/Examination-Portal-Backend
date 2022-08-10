const { Sequelize } = require("sequelize");

const questionSchema = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  technologyid: {
    type: Sequelize.UUID,
  },
  detail: {
    type: Sequelize.STRING,
  },
  options: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    default: [],
  },
  correctoption: {
    type: Sequelize.STRING,
  },
  complexity: {
    type: Sequelize.STRING,
  },
  isattempted: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  selectedoption: {
    type: Sequelize.STRING,
  },
  score: {
    type: Sequelize.NUMBER,
  },
  outofscore: {
    type: Sequelize.NUMBER,
  },
  negativemark: {
    type: Sequelize.NUMBER,
  },
};

module.exports = questionSchema;
