const QuestionView = require("../views/questionView");

exports.createQuestion = async (req, res) => {
  const {
    technologyId,
    detail,
    options,
    correctOption,
    complexity,
    outOfScore,
  } = req.body;

  console.log("OPTIONS: ", options);

  // checks
  if (typeof technologyId !== "string") {
    res.status(400).json({
      error: "Invalid technology id",
    });
    return;
  }
  if (typeof detail !== "string") {
    res.status(400).json({
      error: "Invalid detail",
    });
    return;
  }
  if (typeof options !== "object") {
    res.status(400).json({
      error: "Invalid object",
    });
    return;
  }
  if (typeof correctOption !== "string") {
    res.status(400).json({
      error: "Invalid correct option",
    });
    return;
  }
  if (typeof complexity !== "string") {
    res.status(400).json({
      error: "Invalid complexity",
    });
    return;
  }
  if (typeof outOfScore !== "number") {
    res.status(400).json({
      error: "Invalid out of score",
    });
    return;
  }

  const question = await QuestionView.createQuestion(
    technologyId,
    detail,
    options,
    correctOption,
    complexity,
    outOfScore
  );

  console.log(question.options);
  res.status(200).json(question);
};

exports.getAllQuestions = async (req, res) => {
  const { pageno, noofquestions } = req.query;

  console.log("PAGENO: ", pageno);
  console.log(noofquestions);

  let startIndex = (pageno - 1) * noofquestions;
  let endIndex = pageno * noofquestions;

  console.log(startIndex);
  console.log(endIndex);

  const questions = await QuestionView.getAllQuestions();
  const questionsToSend = questions.slice(startIndex, endIndex);
  console.log(questions);
  console.log(questionsToSend);
  res.status(200).json(questionsToSend);
};

exports.getQuestionByTechnology = async (req, res) => {
  const { id } = req.body;
  const questions = await QuestionView.getQuestionByTechnology(id);
  res.status(200).json(questions);
};

exports.getQuestion = async (req, res) => {
  const { id } = req.body;
  const question = await QuestionView.getQuestion(id);
  res.status(200).json(question);
};

exports.updateQuestion = async (req, res) => {
  let { questionId, parameter, value } = req.body;

  if (typeof questionId !== "string") {
    res.status(400).json({
      error: "Invalid question id",
    });
    return;
  }
  if (typeof parameter !== "string") {
    res.status(400).json({
      error: "Invalid parameter",
    });
    return;
  }
  if (typeof value !== "string") {
    res.status(400).json({
      error: "Invalid value",
    });
    return;
  }

  const question = await QuestionView.getQuestion(questionId);
  // for options

  switch (parameter) {
    case "option1":
      const options = question.options;
      options[0] = value;
      value = options;
      break;

    case "option2":
      const options1 = question.options;
      options1[1] = value;
      value = options1;
      break;

    case "option3":
      const options2 = question.options;
      options2[3] = value;
      value = options2;
      break;

    case "option4":
      const options3 = question.options;
      options3[4] = value;
      value = options3;
      break;
  }

  const updatedQuestion = await QuestionView.updateQuestion(
    questionId,
    parameter,
    value
  );

  if (updatedQuestion === undefined) {
    res.status(400).json({
      error: "Something went wrong",
    });
    return;
  }

  res.status(200).json({
    message: "Question updated successfully",
  });
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    res.status(400).json({
      error: "Invalid id",
    });
    return;
  }

  const deletedQuestion = await QuestionView.deleteQuestion(id);
  console.log(deletedQuestion);

  if (deletedQuestion === 1) {
    res.status(200).json({
      message: "Question Deleted Successfully",
    });
  }
};

exports.restoreQuestion = async (req, res) => {
  const { id } = req.body;

  if (typeof id !== "string") {
    res.status(400).json({
      error: "Invalid id",
    });
    return;
  }

  const restoredQuestion = await QuestionView.restoreQuestion(id);

  if (restoredQuestion === 1) {
    res.status(200).json({
      message: "Question Restored Successfully",
    });
  }
};

exports.getDeletedQuestions = async (req, res) => {
  let questions = await QuestionView.getDeletedQuestions();
  res.status(200).json(questions);
};

exports.getComplexity = (req, res) => {
  const complexities = [1, 2, 3];

  res.status(200).send(complexities);
};
