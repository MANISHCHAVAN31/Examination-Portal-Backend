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
const router = express.Router();

router.post("/createtechnology", createTechnology);
router.put("/updatetechnology", updateTechnology);
router.delete("/deletetechnology", deleteTechnology);
router.post("/gettechnology", getTechnology);
router.get("/getalltechnology", getAllTechnology);
router.get("/getalldeletedtechnology", getAllDeletedTechnology);
router.post("/restoretechnology", restoreDeletedTechnology);

module.exports = router;
