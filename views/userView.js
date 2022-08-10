const { v4 } = require("uuid");
const UserModel = require("../models/userModel");
const CredentialView = require("./credentialView");
const StackView = require("./stackView");

class UserView {
  constructor(
    firstName,
    lastName,
    country,
    role,
    username,
    password,
    frontend,
    backend,
    database
  ) {
    this.id = v4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.role = role; // roles are admin and student
    this.credential = new CredentialView(username, password);
    this.stack = new StackView(frontend, backend, database);
  }

  static async createUser(
    firstName,
    lastName,
    country,
    role,
    username,
    password,
    frontend,
    backend,
    database
  ) {
    const user = new UserView(
      firstName,
      lastName,
      country,
      role,
      username,
      password,
      frontend,
      backend,
      database
    );

    const newUser = await UserModel.createUser(user);
    return newUser;
  }

  static async getUser(username) {
    const db = new UserModel();
    const user = await db.getUser(username);
    return user;
  }

  static async getAllUsers() {
    const db = new UserModel();
    const users = await db.getAllUsers();
    return users;
  }

  static async getDeletedUsers() {
    const db = new UserModel();
    const users = await db.getDeletedUsers();
    return users;
  }

  async deleteUser(username) {
    const db = new UserModel();
    const user = await db.getUser(username);

    if (user === null) {
      return;
    } else {
      const resp = await db.deleteUser(user);
      return resp;
    }
  }

  static async restoreUser(user) {
    const db = new UserModel();
    const restoredUser = await db.restoreUser(user);
    return restoredUser;
  }

  static async getDeletedUser(username) {
    const db = new UserModel();
    const user = db.getDeletedUser(username);
    return user;
  }

  async updateUser(user, parameter, value) {
    const db = new UserModel();
    const updatedUser = await db.updateUser(user, parameter, value);
    return updatedUser;
  }

  static async getAllStudentUser() {
    const db = new UserModel();
    const studentUsers = await db.getAllStudentUser();
    return studentUsers;
  }
}

module.exports = UserView;
