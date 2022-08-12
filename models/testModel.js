const { Test, Technology, Stack } = require("../repository/database");

class TestModel {
  constructor() {}

  async createTest(test) {
    try {
      console.log(test);
      return await Test.create({
        id: test.id,
        technologyid: test.technologyId,
        technologyname: test.technologyname,
        userid: test.userId,
        score: test.score,
        outOfScore: test.outOfScore,
        isattempted: test.isAttempted,
        questions: test.questions,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getTest(id) {
    return await Test.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllTest() {
    try {
      return await Test.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTest(id) {
    try {
      return await Test.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async restoreTest(id) {
    try {
      return await Test.restore({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async submitTest(test) {
    try {
      return await Test.update(
        {
          score: parseFloat(test.score),
          outofscore: test.outofscore,
          isattempted: true,
          questions: test.questions,
        },
        {
          where: {
            id: test.id,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getUserTests(user) {
    try {
      return await Test.findAll({
        where: {
          userid: user.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getTestOfUser(user, technology) {
    try {
      return await Test.findOne({
        where: [{ userid: user.id }, { technologyname: technology }],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getTestByName(id, name) {
    try {
      return await Test.findOne({
        where: {
          userid: id,
          technologyname: name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TestModel;
