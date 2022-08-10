const {
  User,
  Credential,
  Stack,
  Question,
  Test,
  Technology,
} = require("../repository/database");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

class UserModel {
  constructor() {}

  static async createUser(user) {
    try {
      // encrypting password
      const encPassword = await bcrypt.hash(user.credential.password, 10);

      const newUser = await User.create({
        id: user.id,
        firstname: user.firstName,
        lastname: user.lastName,
        country: user.country,
        role: user.role,
      });

      const credential = await Credential.create({
        id: user.credential.id,
        username: user.credential.username,
        password: encPassword,
        userid: user.id,
      });

      const stack = await Stack.create({
        id: user.stack.id,
        frontend: user.stack.frontend,
        backend: user.stack.backend,
        database: user.stack.database,
        userid: user.id,
      });

      return [newUser, credential, stack];
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(username) {
    try {
      return await User.findOne({
        include: [
          {
            model: Credential,
            where: { username: username },
          },
          {
            model: Stack,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers() {
    try {
      return await User.findAll({
        include: [
          {
            model: Credential,
          },
          {
            model: Stack,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getDeletedUsers() {
    try {
      return await User.findAll({
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
        },
        include: [
          {
            model: Credential,
          },
          {
            model: Stack,
          },
        ],
        paranoid: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(user) {
    try {
      return await User.destroy({
        where: {
          id: user.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async restoreUser(user) {
    try {
      console.log("USER: ", user);
      return await User.restore({
        where: {
          id: user.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getDeletedUser(username) {
    try {
      return await User.findOne({
        include: {
          model: Credential,
          where: {
            username: username,
          },
        },
        paranoid: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(user, parameter, value) {
    switch (parameter) {
      case "firstname":
        return await User.update(
          { firstname: value },
          {
            where: {
              id: user.id,
            },
          }
        );
        break;

      case "lastname":
        return await User.update(
          { lastname: value },
          {
            where: {
              id: user.id,
            },
          }
        );
        break;

      case "country":
        return await User.update(
          { country: value },
          {
            where: {
              id: user.id,
            },
          }
        );
        break;
    }
  }

  async getAllStudentUser() {
    try {
      return await User.findAll({
        where: {
          role: "student",
        },
        include: [
          {
            model: Credential,
          },
          {
            model: Stack,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserModel;
