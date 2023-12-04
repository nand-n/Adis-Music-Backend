const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

class Base {
  // Define common properties for all entities inheriting from Base
  constructor() {
    this.schema = new mongoose.Schema({
      _id: {
        type: String,
        default: uuidv4,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      createdBy: {
        type: String,
        default: null,
      },
      updatedBy: {
        type: String,
        default: null,
      },
    });
  }
}

module.exports = { Base };
