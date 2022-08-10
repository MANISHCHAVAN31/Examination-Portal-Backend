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
} = require("../controllers/questionController");
const router = express.Router();

router.post("/createquestion", createQuestion);
router.get("/getallquestions", getAllQuestions);
router.post("/getquestionbytechnology", getQuestionByTechnology);
router.post("/getquestion", getQuestion);
router.put("/updatequestion", updateQuestion);
router.delete("/deletequestion", deleteQuestion);
router.post("/restorequestion", restoreQuestion);
router.get("/getdeletedquestions", getDeletedQuestions);

module.exports = router;
