'use strict';

/************* Sequelize for Role model **************/

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : DataTypes.STRING,
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
        let result  = {};
        result.id   = this.id;
        result.name = this.id;
        result.iso  = this.iso;
        return result;
      }
    }
  });
  return Role;
};
