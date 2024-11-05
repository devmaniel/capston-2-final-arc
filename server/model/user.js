const Sequelize = require('sequelize');
const connection = require('../database/connection');

const UserModel = connection.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: 'Unique identifier for each user'
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Last name of the user'
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'First name of the user'
  },
  middle_name: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: 'Middle name of the user'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: 'Email address of the user'
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: 'Phone number of the user'
  },
  acc_lrn: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'lrns',
      key: 'valid_lrn'
    },
    comment: 'Foreign key linking the user to a valid learner reference number'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Password for user authentication'
  },
  profileImage: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: 'File name of the profile picture'
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Current status of the user (e.g., active, inactive)'
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  }
});


module.exports = UserModel;
