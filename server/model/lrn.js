const Sequelize = require("sequelize");
const connection = require("../database/connection");

const LRN = connection.define("lrns", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: "Unique identifier for each LRN record",
  },
  // Remove the account_id field
  acc_status: {
    type: Sequelize.STRING,
    allowNull: true, // Adjust as needed for your application
    comment: "Indicates the registration status (e.g., 'registered', 'unregistered')",
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "Last name of the student",
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "First name of the student",
  },
  middle_name: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: "Middle name of the student",
  },
  valid_lrn: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: "Valid learner reference number",
  },
  section: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: "Section or class the student belongs to",
  },
  track: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: "Educational track the student is pursuing",
  },
  year_level: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: "Year level of the student",
  },
  status_lrn: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "Current status of the LRN (e.g., enrolled, unenrolled)",
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "Role of the user (e.g., student, teacher, admin)",
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = LRN;
