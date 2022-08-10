const Pool = require("pg").Pool;
const { Sequelize } = require("sequelize");

const pool = new Pool({
  user: "postgres",
  password: "123456",
  database: "examinationproject",
  host: "127.0.0.1",
  post: "5432",
});

const seq = new Sequelize("examinationproject", "postgres", "123456", {
  dialect: "postgres",
  host: pool.host,
});

// definations
const userSchema = require("./definations/user");
const credentialSchema = require("./definations/credential");
const stackSchema = require("./definations/stack");
const technologySchema = require("./definations/technology");
const testSchema = require("./definations/test");
const questionSchema = require("./definations/question");

const User = seq.define("users", userSchema, { paranoid: true });
const Credential = seq.define("credentials", credentialSchema, {
  paranoid: true,
});
const Test = seq.define("tests", testSchema, { paranoid: true });
const Technology = seq.define("technologies", technologySchema, {
  paranoid: true,
});
const Stack = seq.define("stacks", stackSchema, { paranoid: true });
const Question = seq.define("questions", questionSchema, { paranoid: true });

// relations
User.hasOne(Credential, {
  foreignKey: "userid",
});

User.hasOne(Stack, {
  foreignKey: "userid",
});

User.hasMany(Test, {
  foreignKey: "userid",
});

Test.belongsTo(User, {
  foreignKey: "userid",
});

Technology.hasOne(Test, {
  foreignKey: "technologyid",
});

module.exports = { User, Credential, seq, Question, Test, Technology, Stack };
