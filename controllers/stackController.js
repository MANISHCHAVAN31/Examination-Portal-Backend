const UserView = require("../views/userView");

exports.getStackOfUser = async (req, res) => {
  const { username } = req.body;

  if (typeof username !== "string") {
    res.status(400).json({
      error: "Invalid username",
    });
    return;
  }

  const userData = await UserView.getUser(username);
  const stack = userData.stack;
  res.status(200).json(stack);
};
