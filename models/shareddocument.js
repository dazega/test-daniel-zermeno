'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SharedDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SharedDocument.belongsTo(models.User ,{
        as: 'user',
        foreignKey: 'userId'
      });
      SharedDocument.belongsTo(models.Document ,{
        as: 'document',
        foreignKey: 'documentId'
      });
    }
  };
  SharedDocument.init({
    documentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SharedDocument',
  });
  return SharedDocument;
};