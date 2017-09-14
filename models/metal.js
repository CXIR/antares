'use strict';


module.exports = function(sequelize, DataTypes) {
  var Metal = sequelize.define('Metal', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    iso : {
      type : DataTypes.STRING,
      allowNull : false
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
  return Metal;
};
