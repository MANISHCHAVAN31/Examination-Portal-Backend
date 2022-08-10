const UserView = require("../views/userView");
const TechnologyView = require("../views/technologyView");

exports.createTechnology = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== "string") {
    res.status(400).json({
      error: "Invalid technology name",
    });
    return;
  }

  const newTechnology = await TechnologyView.createTechnology(name);
  res.status(200).json(newTechnology);
};

exports.updateTechnology = async (req, res) => {
  const { id, parameter, value } = req.body;

  if (typeof id !== "string") {
    res.status(400).json({
      error: "Invalid technology id",
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

  const isIdExist = await TechnologyView.getTechnology(id);

  console.log(isIdExist);
  if (isIdExist === null) {
    res.status(400).json({
      error: "Technology does not exist",
    });
    return;
  }

  const technologyObj = new TechnologyView();
  const updatedTechnology = await technologyObj.updateTechnology(
    id,
    parameter,
    value
  );

  res.status(200).json({
    message: "Technology updated successfully",
  });
};

exports.deleteTechnology = async (req, res) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    res.status(400).json({
      error: "Technology id is invalid",
    });
    return;
  }

  const technologyObj = new TechnologyView();
  const deletedTechnology = await technologyObj.deleteTechnology(id);
  res.status(200).json({
    message: "Technology deleted successfully",
  });
};

exports.getTechnology = async (req, res) => {
  const { id } = req.body;

  if (typeof id !== "string") {
    res.status(400).json({
      error: "Invalid id",
    });

    return;
  }

  const tech = await TechnologyView.getTechnology(id);
  res.status(200).json(tech);
};

exports.getAllTechnology = async (req, res) => {
  const technologies = await TechnologyView.getAllTechnology();
  res.status(200).json(technologies);
};

exports.getAllDeletedTechnology = async (req, res) => {
  const deletedTechnologies = await TechnologyView.getAllDeletedTechnology();
  res.status(200).json(deletedTechnologies);
};

exports.restoreDeletedTechnology = async (req, res) => {
  const { id } = req.body;

  if (typeof id !== "string") {
    res.status(400).json({
      error: "Invalid technology id",
    });
    return;
  }
  const restoredTechology = await TechnologyView.restoreTechnology(id);

  if (restoredTechology === 1) {
    res.status(200).json({
      message: "Technology restored succcessfully",
    });
  } else {
    res.status(400).json({
      error: "Something went wrong",
    });
  }
};
