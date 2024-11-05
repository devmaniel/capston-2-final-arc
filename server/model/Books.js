const Sequelize = require('sequelize');
const connection = require('../database/connection');

const BooksModel = connection.define('books', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: 'Unique identifier for each book'
  },
  book_name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'Name of the book'
  },
  book_author: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: 'Author of the book'
  },
  book_img_file: {
    type: Sequelize.STRING,
    allowNull: true,  // not null constraint removed
    comment: 'Path or URL to the book cover image'
  },
  book_img_qr: {
    type: Sequelize.STRING,
    allowNull: true,  // not null constraint removed
    comment: 'QR code image associated with the book'
  },
  isbn_code: {
    type: Sequelize.STRING,
    allowNull: true,  // not null constraint removed
    comment: 'ISBN code associated with the book'
  },
  classifications_name: {
    type: Sequelize.STRING,
    allowNull: true,  // optional foreign key
    comment: 'Classification/Genre of the book',
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: 'Number of copies available'
  },
  description: {
    type: Sequelize.TEXT('long'),  // changed to longtext equivalent
    allowNull: true,  // not null constraint removed
    comment: 'Detailed description of the book'
  },
  book_status: {
    type: Sequelize.ENUM('archived', 'active', 'deleted'),
    allowNull: false,
    defaultValue: 'active',
    comment: 'Status of the book'
  },
  publisher: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: 'Publisher of the book'
  },
  date_of_publish: {
    type: Sequelize.DATEONLY,
    allowNull: true,
    comment: 'Date of publication'
  },
  edition: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: 'Edition of the book'
  }
});

module.exports = BooksModel;
