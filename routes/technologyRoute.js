const express = require("express");
const {
  createTechnology,
  updateTechnology,
  deleteTechnology,
  getTechnology,
  getAllTechnology,
  getAllDeletedTechnology,
  restoreDeletedTechnology,
} = require("../controllers/technologyController");
const { isAuthenticated } = require("../middleware");
const router = express.Router();

router.post("/createtechnology", isAuthenticated, createTechnology);
router.put("/updatetechnology", isAuthenticated, updateTechnology);
router.delete("/deletetechnology", isAuthenticated, deleteTechnology);
router.post("/gettechnology", isAuthenticated, getTechnology);
router.get("/getalltechnology", isAuthenticated, getAllTechnology);
router.get(
  "/getalldeletedtechnology",
  isAuthenticated,
  getAllDeletedTechnology
);
router.post("/restoretechnology", isAuthenticated, restoreDeletedTechnology);

module.exports = router;
