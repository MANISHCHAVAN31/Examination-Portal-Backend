const express = require("express");
const { getTestOfUser } = require("../controllers/testController");
const router = express.Router();
const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getDeletedUsers,
  restoreDeletedUser,
  getAllStudentUser,
  restoreUser,
  dataForPieChart,
  getStudentPieChartData,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleware");

router.post("/createuser", isAuthenticated, createUser);
router.post("/getuser", isAuthenticated, getUser);
router.get("/getallusers", isAuthenticated, getAllUsers);
router.put("/updateuser", isAuthenticated, updateUser);
router.delete("/deleteuser", isAuthenticated, deleteUser);
router.get("/getdeletedusers", isAuthenticated, getDeletedUsers);
router.post("/restoreuser", isAuthenticated, restoreUser);
router.get("/getallstudentuser", isAuthenticated, getAllStudentUser);
router.post("/gettestofuser", isAuthenticated, getTestOfUser);
router.get("/getdataforpiechart", isAuthenticated, dataForPieChart);
router.post("/getstudentpiechartdata", isAuthenticated, getStudentPieChartData);

module.exports = router;
