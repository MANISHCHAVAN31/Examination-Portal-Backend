const e = require("express");
const { v4 } = require("uuid");
const { Test } = require("../repository/database");
const { id } = require("../repository/definations/question");
const QuestionView = require("../views/questionView");
const TechnologyView = require("../views/technologyView");
const TestView = require("../views/testView");
const UserView = require("../views/userView");
const TestJwt = require("../utils/TestJwt");

exports.createTest = async (req, res) => {
  // names of user and technology
  const { user, technology } = req.body;

  // checks
  if (typeof technology !== "string") {
    res.status(400).json({
      error: "Invalid technology",
    });
    return;
  }
  if (typeof user !== "string") {
    res.status(400).json({
      error: "Invalid user",
    });
    return;
  }

  // get ids
  const techObj = await TechnologyView.getTechnologyByName(technology);
  const technologyId = techObj.id;

  const userObj = await UserView.getUser(user);
  const userId = userObj.id;

  const rawQuestions = await QuestionView.getQuestionByTechnology(technologyId);
  const test = await TestView.createTest(
    technologyId,
    technology,
    userId,
    rawQuestions
  );

  const questions = convertQuestionsToFormat(test.questions);
  test.questions = questions;

  // adding test token in cookies
  const token = new TestJwt(
    userObj.id,
    userObj.credential.username,
    test.id,
    technology
  );
  let testToken = token.createTestToken();
  res.cookie("testToken", testToken);

  res.status(200).json(test);
};

const convertQuestionsToFormat = (question) => {
  const newQuestionJSON = [];
  for (let i in question) {
    const parsedData = JSON.parse(question[i]);
    newQuestionJSON.push(parsedData);
  }

  return newQuestionJSON;
};

exports.getTest = async (req, res) => {
  const { id } = req.body;

  if (typeof id !== "string") {
    res.status(400).json({
      error: "Invalid technology id",
    });
    return;
  }

  const test = await TestView.getTest(id);

  res.status(200).json(test);
};

exports.getAllTest = async (req, res) => {
  const tests = await TestView.getAllTest();
  res.status(200).json(tests);
};

exports.deleteTest = async (req, res) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    res.status(400).json({
      error: "Invalid test id",
    });
    return;
  }

  const deletedTest = await TestView.deleteTest(id);

  if (deletedTest === 1) {
    res.status(200).json({
      message: "Test deleted successfully",
    });
    return;
  } else {
    res.status(400).json({
      error: "Something went wrong",
    });
    return;
  }
};

exports.restoreTest = async (req, res) => {
  const { id } = req.body;

  if (typeof id !== "string") {
    res.status(400).json({
      error: "Invalid test id",
    });
    return;
  }

  const restoredTest = await TestView.restoreTest(id);

  if (restoredTest === 1) {
    res.status(200).json({
      message: "Test restored successfully",
    });
    return;
  } else {
    res.status(400).json({
      error: "Something went wrong",
    });
    return;
  }
};

exports.submitTest = async (req, res) => {
  const { test } = req.body;

  if (typeof test !== "object") {
    res.status(400).json({
      error: "Invalid test",
    });
    return;
  }

  console.log(test);

  // calculate outofscore
  let outOfScore = 0;
  for (let i in test.questions) {
    outOfScore += parseInt(test.questions[i].outofscore);
  }
  test.outofscore = outOfScore;

  // calculate score
  let questions = test.questions;
  for (let i in questions) {
    if (
      questions[i].isattempted &&
      questions[i].correctoption === questions[i].selectedoption
    ) {
      questions[i].score = questions[i].outofscore;
      console.log(questions[i].score);
    } else if (
      questions[i].isattempted &&
      questions[i].correctoption !== questions[i].selectedoption
    ) {
      questions[i].score = questions[i].score - questions[i].negativemark;
      console.log(questions[i].score);
    } else if (questions[i].isattempted == false) {
      questions[i].score = 0;
      console.log(questions[i].score);
    }
  }

  // calculate total score
  let testScore = 0;
  for (let i in questions) {
    testScore += parseFloat(questions[i].score);
  }
  test.score = testScore;

  console.log("TEST SCORE: ", test.score);

  const submitTest = await TestView.submitTest(test);
  console.log("SUBMIT TEST: ", submitTest);

  if (submitTest) {
    // clear test cookie
    res.clearCookie("testToken");

    res.status(200).json({
      message: "Test submitted successfully",
    });
  } else {
    res.status(400).json({
      error: "Something went wrong in submission",
    });
  }
};

exports.getUserTests = async (req, res) => {
  const { username } = req.body;

  if (typeof username !== "string") {
    res.status(400).json({
      error: "Invalid username",
    });
    return;
  }

  let tests = await TestView.getUserTests(username);

  res.status(200).json(tests);
};

exports.getTestOfUser = async (req, res) => {
  const { username, technology } = req.body;

  if (typeof username !== "string") {
    res.status(400).json({
      error: "Invalid username",
    });
    return;
  }

  if (typeof technology !== "string") {
    res.status(400).json({
      error: "Invalid technology",
    });
    return;
  }

  const test = await TestView.getTestOfUser(username, technology);

  if (test === null) {
    res.status(200).json(test);
    return;
  }
  const questions = test.questions;
  const formattedQuestions = convertQuestionsToFormat(questions);
  test.questions = formattedQuestions;
  res.status(200).json(test);
};

exports.getTestsStatus = async (req, res) => {
  const { username } = req.body;

  if (typeof username !== "string") {
    res.status(400).send("Invalid Username");
    return;
  }

  const user = await UserView.getUser(username);
  const frontendTest = await TestView.getTestByName(
    user.id,
    user.stack.frontend
  );
  const backendTest = await TestView.getTestByName(user.id, user.stack.backend);
  const databaseTest = await TestView.getTestByName(
    user.id,
    user.stack.database
  );

  res.status(200).json({
    stack: user.stack,
    frontend: frontendTest,
    backend: backendTest,
    database: databaseTest,
  });
};
