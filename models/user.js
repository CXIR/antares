'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    }
  }, {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {

      }
    },
    instanceMethods: {
      responsify: function() {
        let result = {};

        return result;
      }
    }
  });
  return User;
};
