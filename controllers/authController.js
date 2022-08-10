const UserView = require("../views/userView");
const bcrypt = require("bcrypt");
const JwtToken = require("../utils/Jwt");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== "string") {
    res.status(400).json({
      error: "invalid username",
    });
    error;
  }

  if (typeof password !== "string") {
    res.status(400).json({
      error: "invalid password",
    });
    error;
  }

  const existingUser = await UserView.getUser(username);

  if (!existingUser) {
    res.status(400).json({
      error: "User with this username not present",
    });
    return;
  }

  // compare password
  console.log(existingUser.credential.password);
  console.log(password);
  const isValidPassword = await bcrypt.compare(
    password,
    existingUser.credential.password
  );

  if (!isValidPassword) {
    res.status(400).json({
      error: "Invalid Password",
    });
    return;
  }

  // create token and cookie
  const token = new JwtToken(
    existingUser.id,
    existingUser.credential.username,
    existingUser.role
  );

  let loginToken = token.createToken();

  res.cookie("loginToken", loginToken);
  res.status(200).send(existingUser);
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("loginToken");
  res.status(200).send("User logged out successfully");
};
