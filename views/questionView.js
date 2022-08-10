const { v4 } = require("uuid");
const QuestionModel = require("../models/questionModel");

class QuestionView {
  constructor(
    technologyId,
    detail,
    options,
    correctOption,
    complexity,
    outOfScore
  ) {
    this.id = v4();
    this.technologyId = technologyId;
    this.detail = detail;
    this.options = options;
    this.correctOption = correctOption;
    this.isAttempted = false;
    this.selectedOption = null;
    this.score = null;
    this.outOfScore = outOfScore;
    this.complexity = complexity;
    this.negativeMark = 0.25 * this.outOfScore;
  }

  static async createQuestion(
    technologyId,
    detail,
    options,
    correctOption,
    complexity,
    outOfScore
  ) {
    const db = new QuestionModel();
    const question = new QuestionView(
      technologyId,
      detail,
      options,
      correctOption,
      complexity,
      outOfScore
    );
    console.log(question);

    const newQuestion = await db.createQuestion(question);
    return newQuestion;
  }

  static async getAllQuestions() {
    const db = new QuestionModel();
    const questions = await db.getAllQuestions();
    return questions;
  }

  static async getDeletedQuestions() {
    const db = new QuestionModel();
    const questions = await db.getDeletedQuestions();
    return questions;
  }

  static async getQuestionByTechnology(id) {
    const db = new QuestionModel();
    const questions = await db.getQuestionByTechnology(id);
    return questions;
  }

  static async getQuestion(id) {
    const db = new QuestionModel();
    const questions = await db.getQuestion(id);
    return questions;
  }

  static async updateQuestion(questionId, parameter, value) {
    const db = new QuestionModel();
    const updatedQuestion = await db.updateQuestion(
      questionId,
      parameter,
      value
    );
    return updatedQuestion;
  }

  static async deleteQuestion(id) {
    const db = new QuestionModel();
    const deletedQuestion = await db.deleteQuestion(id);
    return deletedQuestion;
  }

  static async restoreQuestion(id) {
    const db = new QuestionModel();
    const restoredQuestion = await db.restoreQuestion(id);
    return restoredQuestion;
  }
}

module.exports = QuestionView;
