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
  getTestsStatus,
} = require("../controllers/testController");

const { isAuthenticated } = require("../middleware");

router.post("/createtest", isAuthenticated, createTest);
router.post("/gettest", isAuthenticated, getTest);
router.get("/getalltest", isAuthenticated, getAllTest);
router.delete("/deletetest", isAuthenticated, deleteTest);
router.post("/restoretest", isAuthenticated, restoreTest);
router.post("/submittest", isAuthenticated, submitTest);
router.post("/getusertests", isAuthenticated, getUserTests);
router.post("/gettestofuser", isAuthenticated, getTestOfUser);
router.post("/gettestsstatus", isAuthenticated, getTestsStatus);

module.exports = router;
