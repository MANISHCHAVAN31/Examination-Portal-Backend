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
} = require("../controllers/userController");

router.post("/createuser", createUser);
router.post("/getuser", getUser);
router.get("/getallusers", getAllUsers);
router.put("/updateuser", updateUser);
router.delete("/deleteuser", deleteUser);
router.get("/getdeletedusers", getDeletedUsers);
router.post("/restoreuser", restoreUser);
router.get("/getallstudentuser", getAllStudentUser);
router.post("/gettestofuser", getTestOfUser);

module.exports = router;
