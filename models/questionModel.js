const { Question } = require("../repository/database");
const { Op } = require("sequelize");

class QuestionModel {
  constructor() {}

  async createQuestion(question) {
    try {
      return await Question.create({
        id: question.id,
        technologyid: question.technologyId,
        detail: question.detail,
        options: question.options,
        correctoption: question.correctOption,
        selectedoption: question.selectedOption,
        score: question.score,
        outofscore: question.outOfScore,
        negativemark: question.negativeMark,
        isattempted: question.isAttempted,
        complexity: question.complexity,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllQuestions() {
    try {
      return await Question.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async getQuestionByTechnology(id) {
    try {
      return await Question.findAll({
        where: {
          technologyid: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getQuestion(id) {
    try {
      return await Question.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateQuestion(questionId, parameter, value) {
    try {
      switch (parameter) {
        case "detail":
          return await Question.update(
            { detail: value },
            {
              where: {
                id: questionId,
              },
            }
          );
          break;

        case "option1":
          return await Question.update(
            { options: value },
            {
              where: {
                id: questionId,
              },
            }
          );
          break;

        case "option2":
          return await Question.update(
            { options: value },
            {
              where: {
                id: questionId,
              },
            }
          );
          break;

        case "option3":
          return await Question.update(
            { options: value },
            {
              where: {
                id: questionId,
              },
            }
          );
          break;

        case "option4":
          return await Question.update(
            { options: value },
            {
              where: {
                id: questionId,
              },
            }
          );
          break;

        case "outofscore":
          return await Question.update(
            { outofscore: value },
            {
              where: {
                id: questionId,
              },
            }
          );
          break;

        case "complexity":
          return await Question.update(
            { complexity: value },
            {
              where: {
                id: questionId,
              },
            }
          );
          break;

        case "correctoption":
          return await Question.update(
            { correctoption: value },
            {
              where: {
                id: questionId,
              },
            }
          );
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteQuestion(id) {
    try {
      return await Question.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async restoreQuestion(id) {
    try {
      return await Question.restore({
        where: {
          id: id,
        },
        paranoid: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getDeletedQuestions() {
    try {
      return Question.findAll({
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
        },
        paranoid: false,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = QuestionModel;
