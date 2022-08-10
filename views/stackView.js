const { v4 } = require("uuid");

class StackView {
  constructor(frontend, backend, database) {
    this.id = v4();
    this.frontend = frontend;
    this.backend = backend;
    this.database = database;
  }
}

module.exports = StackView;
