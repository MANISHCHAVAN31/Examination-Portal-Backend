const express = require("express");
const { getStackOfUser } = require("../controllers/stackController");
const router = express.Router();

router.post("/getstackofuser", getStackOfUser);

module.exports = router;
