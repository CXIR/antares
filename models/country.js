'use strict';

/************* Sequelize for Metal model **************/

module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define('Country', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    iso2 : {
      type : DataTypes.STRING,
      allowNull : false
    },
    iso3 : {
      type : DataTypes.STRING,
      allowNull : false
    },
    number : {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    paranoid : true,
    underscored : true,
    freezeTableName : true,
    classMethods : {
      associate : function(models) {

      }
    },
    instanceMethods : {
      responsify : function() {
        let result    = {};
        result.id     = this.id;
        result.name   = this.name;
        result.iso2   = this.iso2;
        result.iso3   = this.iso3;
        result.number = this.number;
        return result;
      }
    }
  });
  return Country;
};
