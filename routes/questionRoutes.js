const express = require("express");
const {
  createQuestion,
  getAllQuestions,
  getQuestionByTechnology,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  restoreQuestion,
  getDeletedQuestions,
  getComplexity,
} = require("../controllers/questionController");
const { checkoutUser, isAuthenticated } = require("../middleware");
const router = express.Router();

router.post("/createquestion", isAuthenticated, createQuestion);
router.get("/getallquestions", isAuthenticated, getAllQuestions);
router.post(
  "/getquestionbytechnology",
  isAuthenticated,
  getQuestionByTechnology
);
router.post("/getquestion", isAuthenticated, getQuestion);
router.put("/updatequestion", isAuthenticated, updateQuestion);
router.delete("/deletequestion", isAuthenticated, deleteQuestion);
router.post("/restorequestion", isAuthenticated, restoreQuestion);
router.get("/getdeletedquestions", isAuthenticated, getDeletedQuestions);
router.get("/getcomplexity", isAuthenticated, getComplexity);

module.exports = router;
