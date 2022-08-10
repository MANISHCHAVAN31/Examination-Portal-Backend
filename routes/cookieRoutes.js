const express = require("express");
const { checkoutUser, checkoutTest } = require("../middleware");
const router = express.Router();

router.get("/checkoutuser", checkoutUser);
router.get("/checkouttest", checkoutTest);

module.exports = router;
