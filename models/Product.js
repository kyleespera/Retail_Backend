const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define Product model structure
class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true // Automatically increment the ID for new entries
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false // Require a product name for each entry
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Specify precision for the price
      allowNull: false,
      validate: {
        isDecimal: true // Ensure the price is in decimal format
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10, // Set a default value for stock
      validate: {
        isNumeric: true // Ensure the stock value is numeric
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category', // This should match the table name
        key: 'id' // The column in the category table to which this field refers
      }
    }
  },
  {
    sequelize, // Pass the connection instance
    timestamps: false, // Do not automatically add timestamp fields
    freezeTableName: true, // Prevent Sequelize from renaming the table
    underscored: true, // Use snake_case rather than camelCase for database fields
    modelName: 'product', // Define the name used for the model
  }
);

module.exports = Product;
