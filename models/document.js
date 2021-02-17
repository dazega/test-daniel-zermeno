'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.User ,{
        as: 'user',
        foreignKey: 'userId'
      });
    }
  };
  Document.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    category: DataTypes.ENUM('ECONOMICS', 'POLITICS', 'SOCIAL'),
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};