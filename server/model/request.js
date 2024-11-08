const Sequelize = require('sequelize');
const connection = require('../database/connection');

const RequestModel = connection.define('request', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: 'Unique identifier for each request'
  },
  book_qty: {
    type: Sequelize.STRING,  // Adjust type if needed (e.g., INTEGER if you only store numbers)
    allowNull: true,  // Nullable if optional
    comment: 'Number of Books that want to borrow'
  },
  request_code: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Unique code assigned to each request for tracking purposes'
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: 'Foreign key linking the request to the specific user',
    references: {
      model: 'users',  // references the users table
      key: 'id'
    }
  },
  book_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: 'Foreign key linking the request to the specific book',
    references: {
      model: 'books',  // references the books table
      key: 'id'
    }
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Current status of the request (e.g., pending, approved, denied)'
  },
  authorizer: {
    type: Sequelize.STRING,
    allowNull: true,  // Nullable if optional
    comment: 'Name or ID of the librarian or staff member who authorized the request'
  },
  request_qr_img: {
    type: Sequelize.STRING,
    allowNull: true,  // Nullable
    comment: 'File name of the QR code image associated with the request'
  },
  student_comment: {
    type: Sequelize.TEXT,
    allowNull: true,  // Nullable
    comment: 'Optional comment added by the student regarding the request'
  },
  admin_comment: {
    type: Sequelize.TEXT,
    allowNull: true,  // Nullable
    comment: 'Comment added by the admin to provide feedback or updates on the request'
  },
  pickupdate: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: 'The date the user plans to pick up the book(s)'
  },
  returndate: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: 'The date the user plans to return the book(s)'
  }
});

module.exports = RequestModel;
