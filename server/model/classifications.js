const Sequelize = require('sequelize');
const connection = require('../database/connection');

const ClassificationModel = connection.define('classifications', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: 'Unique identifier for each classification',
  },
  class_name: {
    type: Sequelize.STRING,
    allowNull: true,  // nullable
    comment: 'Classification name of the book'
  }
});

module.exports = ClassificationModel;
