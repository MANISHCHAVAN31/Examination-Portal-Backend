const express = require("express");
const { getStackOfUser } = require("../controllers/stackController");
const { isAuthenticated } = require("../middleware");
const router = express.Router();

router.post("/getstackofuser", isAuthenticated, getStackOfUser);

module.exports = router;
