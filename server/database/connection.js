const {Sequelize} = require('sequelize');

const connections = new Sequelize('library_books2', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3307// Specify the port number here
});
  
module.exports = connections;
  
