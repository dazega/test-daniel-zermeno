'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecordHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RecordHistory.belongsTo(models.Document ,{
        as: 'document',
        foreignKey: 'documentId'
      });
    }
  };
  RecordHistory.init({
    category: DataTypes.ENUM('ECONOMICS', 'POLITICS', 'SOCIAL'),
    content: DataTypes.STRING,
    documentId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    ownerName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RecordHistory',
  });
  return RecordHistory;
};