const UserView = require("../views/userView");
const StackView = require("../views/stackView");
const TestView = require("../views/testView");

exports.createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    country,
    role,
    username,
    password,
    frontend,
    backend,
    database,
  } = req.body;

  if (
    !(
      firstName &&
      lastName &&
      country &&
      role &&
      username &&
      password &&
      frontend &&
      backend &&
      database
    )
  ) {
    res.status(400).json({
      error: "Obtained data is incomplete",
    });
    return;
  }
  if (typeof firstName !== "string") {
    res.status(400).json({
      error: "First name is not a string",
    });
    return;
  }

  if (typeof lastName !== "string") {
    res.status(400).json({
      error: "Last name is not a string",
    });
    return;
  }

  if (typeof country !== "string") {
    res.status(400).json({
      error: "Country is not a string",
    });
    return;
  }

  if (typeof role !== "string") {
    res.status(400).json({
      error: "Role is not a string",
    });
    return;
  }

  if (typeof username !== "string") {
    res.status(400).json({
      error: "Username is not a string",
    });
    return;
  }

  if (typeof password !== "string") {
    res.status(400).json({
      error: "Password is not a string",
    });
    return;
  }

  if (typeof frontend !== "string") {
    res.status(400).json({
      error: "Frontend is not a string",
    });
    return;
  }

  if (typeof backend !== "string") {
    res.status(400).json({
      error: "Backend is not a string",
    });
    return;
  }

  if (typeof database !== "string") {
    res.status(400).json({
      error: "Database is not a string",
    });
    return;
  }

  const existingUser = await UserView.getUser(username);
  console.log(existingUser);

  if (existingUser !== null) {
    res.status(400).json({
      error: "username is already present in database",
    });
    return;
  }

  const user = await UserView.createUser(
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

  res.status(200).json(user);
};

exports.getUser = async (req, res) => {
  const { username } = req.body;

  if (typeof username !== "string") {
    res.status(400).json({
      error: "Invalid Username",
    });
    return;
  }

  const user = await UserView.getUser(username);

  if (user === null) {
    res.status(200).json({
      error: "UserView is not present in database",
    });
    return;
  }

  res.status(200).json(user);
};

exports.getAllUsers = async (req, res) => {
  const allUsers = await UserView.getAllUsers();
  res.status(200).json(allUsers);
};

exports.getDeletedUsers = async (req, res) => {
  const deletedUsers = await UserView.getDeletedUsers();
  res.status(200).json(deletedUsers);
};

exports.deleteUser = async (req, res) => {
  const { username } = req.query;

  if (typeof username !== "string") {
    res.status(400).json({
      error: "Invalid Username",
    });
    return;
  }
  const userObj = new UserView();
  const deletedUser = await userObj.deleteUser(username);

  if (deletedUser === 1) {
    res.status(200).json({
      message: "User deleted successfully",
    });
    return;
  } else {
    res.status(200).json({
      message: "Something went wrong in deletion",
    });
    return;
  }
};

exports.restoreUser = async (req, res) => {
  const { username } = req.body;

  if (typeof username !== "string") {
    res.status(400).json({
      error: "Invalid username",
    });
    return;
  }

  const user = await UserView.getDeletedUser(username);
  console.log(user);
  const restoredUser = await UserView.restoreUser(user);
  res.status(200).json(restoredUser);
};

exports.updateUser = async (req, res) => {
  const { username, parameter, value } = req.body;

  if (typeof username !== "string") {
    res.status(400).json({
      error: "Invalid username",
    });
    return;
  }

  if (typeof parameter !== "string") {
    res.status(400).json({
      error: "Invalid parameter to update",
    });
    return;
  }

  if (parameter === "username" || parameter === "password") {
    res.status(400).json({
      error: "Can not update this parameter",
    });
    return;
  }

  if (typeof value !== "string") {
    res.status(400).json({
      error: "Invalid value to update",
    });
    return;
  }

  const user = await UserView.getUser(username);
  if (user === null) {
    res.status(400).json({
      error: "user not found",
    });
    return;
  }

  const userObj = new UserView();
  const updatedUser = await userObj.updateUser(user, parameter, value);
  res.status(200).json({
    message: "UserView updated successfully",
  });
};

exports.getAllStudentUser = async (req, res) => {
  const { pageno, noofstudents } = req.query;

  let startIndex = (pageno - 1) * noofstudents;
  let endIndex = pageno * noofstudents;

  const studentUsers = await UserView.getAllStudentUser();
  const studentUsersToSend = studentUsers.slice(startIndex, endIndex);
  res.status(200).json(studentUsersToSend);
};

exports.dataForPieChart = async (req, res) => {
  const allUsers = await UserView.getAllUsers();
  const allUserscount = allUsers.length;

  const alltests = await TestView.getAllTest();
  let arrOfUsers = [];

  if (!arrOfUsers.includes(alltests.userid)) {
    arrOfUsers.push(alltests.id);
  }

  console.log(arrOfUsers);
  let testGivenUsers = arrOfUsers.length;

  res.status(200).json({
    TotalUsers: allUserscount,
    TestGivenUsers: testGivenUsers,
  });
};

exports.getStudentPieChartData = async (req, res) => {
  const { username } = req.body;

  if (typeof username !== "string") {
    res.status(400).send("Invalid username");
    return;
  }

  const tests = await TestView.getUserTests(username);
  let testCount = tests.length;
  console.log("TEST COUNT : ", testCount);
  res.status(200).json({
    testcount: testCount,
  });
};
