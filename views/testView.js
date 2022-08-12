const { v4 } = require("uuid");
const QuestionModel = require("../models/questionModel");
const TestModel = require("../models/testModel");
const UserView = require("./userView");

class TestView {
  constructor(technologyId, technologyname, userId, questions) {
    this.id = v4();
    this.technologyId = technologyId;
    this.technologyname = technologyname;
    this.userId = userId;
    this.score = null;
    this.outOfScore = null;
    this.isAttempted = false;
    this.questions = questions;
  }

  static async createTest(technologyId, technologyname, userId, questions) {
    const db = new TestModel();
    const test = new TestView(technologyId, technologyname, userId, questions);
    const newTest = await db.createTest(test);
    return newTest;
  }

  static async getTest(id) {
    const db = new TestModel();
    const test = await db.getTest(id);
    return test;
  }

  static async getAllTest() {
    const db = new TestModel();
    const tests = await db.getAllTest();
    return tests;
  }

  static async deleteTest(id) {
    const db = new TestModel();
    const test = await db.deleteTest(id);
    return test;
  }

  static async restoreTest(id) {
    const db = new TestModel();
    const test = await db.restoreTest(id);
    return test;
  }

  static async submitTest(test) {
    const db = new TestModel();
    const submittedTest = await db.submitTest(test);
    return submittedTest;
  }

  static async getUserTests(username) {
    const db = new TestModel();
    const user = await UserView.getUser(username);
    const tests = await db.getUserTests(user);
    return tests;
  }

  static async getTestOfUser(username, technology) {
    const db = new TestModel();
    const user = await UserView.getUser(username);
    const tests = await db.getTestOfUser(user, technology);
    return tests;
  }

  static async getTestByName(id, name) {
    const db = new TestModel();
    const test = await db.getTestByName(id, name);
    return test;
  }
}

module.exports = TestView;
