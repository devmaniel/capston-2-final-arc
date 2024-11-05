const Sequelize = require('sequelize');
const connection = require('../database/connection');

const ViolationsModel = connection.define('violations', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: 'Unique identifier for each violation'
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: 'Foreign key linking the violation to the specific user',
    references: {
      model: 'users',  // references the users table
      key: 'id'
    }
  },
  type_of_violation: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Description or category of the violation'
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Current status of the violation (e.g., pending, resolved)'
  },
  date_issued: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: 'Date when the violation was issued'
  }
});

module.exports = ViolationsModel;
