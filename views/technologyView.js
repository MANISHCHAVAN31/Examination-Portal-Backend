const { v4 } = require("uuid");
const TechnologyModel = require("../models/technologyModel");

class TechnologyView {
  constructor(name) {
    this.id = v4();
    this.name = name;
  }

  static async createTechnology(name) {
    const db = new TechnologyModel();
    const newTechnology = new TechnologyView(name);
    const newCreatedtechnology = await db.createTechnology(newTechnology);
    return newCreatedtechnology;
  }

  async updateTechnology(id, parameter, value) {
    const db = new TechnologyModel();
    const updatedTech = await db.updateTechnology(id, parameter, value);
    return updatedTech;
  }

  async deleteTechnology(id) {
    const db = new TechnologyModel();
    const deletedTech = await db.deleteTechnology(id);
    return deletedTech;
  }

  static async getTechnology(id) {
    const db = new TechnologyModel();
    const tech = db.getTechnology(id);
    return tech;
  }

  static async getTechnologyByName(name) {
    const db = new TechnologyModel();
    const tech = db.getTechnologyByName(name);
    return tech;
  }

  static async getAllTechnology() {
    const db = new TechnologyModel();
    const tech = db.getAllTechnologies();
    return tech;
  }

  static async getAllDeletedTechnology() {
    const db = new TechnologyModel();
    const tech = db.getAllDeletedTechnology();
    return tech;
  }

  static async restoreTechnology(id) {
    const db = new TechnologyModel();
    const tech = db.restoreTechnology(id);
    return tech;
  }
}

module.exports = TechnologyView;
