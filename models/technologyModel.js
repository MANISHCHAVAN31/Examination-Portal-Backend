const { Technology } = require("../repository/database");
const { Op } = require("sequelize");

class TechnologyModel {
  async createTechnology(technology) {
    try {
      return await Technology.create({
        id: technology.id,
        name: technology.name,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateTechnology(id, parameter, value) {
    try {
      switch (parameter) {
        case "name":
          {
            return await Technology.update(
              { name: value },
              {
                where: {
                  id: id,
                },
              }
            );
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTechnology(id) {
    try {
      return await Technology.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getTechnology(id) {
    try {
      return await Technology.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getTechnologyByName(name) {
    try {
      return await Technology.findOne({
        where: {
          name: name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllTechnologies() {
    try {
      return await Technology.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDeletedTechnology() {
    try {
      return await Technology.findAll({
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
        },
        paranoid: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async restoreTechnology(id) {
    try {
      console.log(id);
      return await Technology.restore({
        where: {
          id: id,
        },
        paranoid: false,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TechnologyModel;
