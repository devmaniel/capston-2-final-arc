const Sequelize = require('sequelize');
const connection = require('../database/connection');

const BookmarkModel = connection.define('bookmarks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: 'Unique identifier for each bookmark'
  },
  user_id: {
    type: Sequelize.INTEGER,
    
    allowNull: false,
    comment: 'Foreign key linking to the user who bookmarked the book'
  },
  book_id: {
    type: Sequelize.INTEGER,
    
    allowNull: false,
    comment: 'Foreign key linking to the bookmarked book'
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    comment: 'Timestamp when the bookmark was created'
  }
});

module.exports = BookmarkModel;
