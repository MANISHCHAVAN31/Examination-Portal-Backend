const jwt = require("jsonwebtoken");
const testSecretKey = "THISISSECRETKEYFORTEST";

class TestJwt {
  constructor(userId, username, testId, technology) {
    this.userid = userId;
    this.username = username;
    this.testid = testId;
    this.technology = technology;
  }

  createTestToken() {
    return jwt.sign(JSON.stringify(this), testSecretKey);
  }

  static validateToken(req, cookieIdentifier) {
    let allCookies = req.cookies;
    if (!allCookies[cookieIdentifier]) {
      return false;
    }
    return jwt.verify(allCookies[cookieIdentifier], testSecretKey);
  }
}

module.exports = TestJwt;
