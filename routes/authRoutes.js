const express = require("express");
const { loginUser, logoutUser } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware");
const router = express.Router();

router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);

module.exports = router;
