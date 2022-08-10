const express = require("express");
const router = express.Router();
const {
  createTest,
  getTest,
  getAllTest,
  deleteTest,
  restoreTest,
  submitTest,
  getUserTests,
  getTestOfUser,
} = require("../controllers/testController");

router.post("/createtest", createTest);
router.post("/gettest", getTest);
router.get("/getalltest", getAllTest);
router.delete("/deletetest", deleteTest);
router.post("/restoretest", restoreTest);
router.post("/submittest", submitTest);
router.post("/getusertests", getUserTests);
router.post("/gettestofuser", getTestOfUser);

module.exports = router;
