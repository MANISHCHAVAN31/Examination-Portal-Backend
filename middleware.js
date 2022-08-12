const UserView = require("./views/userView");
const TechnologyView = require("./views/technologyView");
const JwtToken = require("./utils/Jwt");

exports.checkoutUser = async (req, res, next) => {
  const { username } = req.query;

  if (typeof username !== "string") {
    res.status(400).send("Invlid username");
    return;
  }

  const userData = await UserView.getUser(username);

  const cookieData = JwtToken.validateToken(req, "loginToken");

  if (!cookieData) {
    res.status(400).send("Cookie not found");
    return;
  }

  if (cookieData) {
    if (cookieData.username !== username) {
      res.status(400).send("User is not valid");
      return;
    } else if (userData !== null && cookieData.role !== userData.role) {
      res.status(400).send("User is restricted to access this information");
      return;
    }
  }

  // next();
};

exports.checkoutTest = async (req, res, next) => {
  const username = req.query;
  const technology = req.query;

  if (typeof username !== "string") {
    res.status(400).send("Invlid username");
    return;
  }

  if (typeof technology !== "string") {
    res.status(400).send("Invlid technology");
    return;
  }

  const userData = await UserView.getUser(username);
  const technologyData = await TechnologyView.getTechnologyByName(technology);

  const cookieData = JwtToken.validateToken(req, "testToken");

  if (!cookieData) {
    res.status(400).send("Test cookie not found");
    return;
  }

  if (cookieData) {
    if (cookieData.username !== username) {
      res.status(400).send("User is not valid for test");
      return;
    } else if (cookieData.technology !== technology) {
      res.status(400).send("This test is not valid");
      return;
    }
  }
};

exports.isAuthenticated = (req, resp, next) => {
  if (!JwtToken.validateToken(req, "loginToken").isValid) {
    resp.status(401).send("Login first to proceed");
    return;
  } else {
    next();
  }
};
