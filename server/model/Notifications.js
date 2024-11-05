const Sequelize = require("sequelize");
const connection = require("../database/connection");

// Define the Notifications model
const Notifications = connection.define("notifications", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    descriptions: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    href: {
        type: Sequelize.STRING(255), // VARCHAR(255)
        allowNull: true,
    },
    type: {
        type: Sequelize.ENUM('book', 'request'), // ENUM type
        allowNull: false,
    },
    isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // Default to false
    }
}, {
    tableName: 'Notifications', // Use the exact table name
    timestamps: true, // Optional: if you want to track createdAt and updatedAt
});

// Export the Notifications model
module.exports = Notifications;
