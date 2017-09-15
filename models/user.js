'use strict';

/************* Sequelize for User model **************/

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    first : {
      type : DataTypes.STRING,
      allowNull : false
    },
    mail : {
      type : DataTypes.STRING,
      allowNull : true
    },
    identifier : {
      type : DataTypes.STRING,
      allowNull : false
    },
    password : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    paranoid : true,
    underscored : true,
    freezeTableName : true,
    classMethods : {
      associate : function(models) {
        User.belongsTo(models.Role);
      }
    },
    instanceMethods : {
      responsify : function() {
        let result        = {};
        result.id         = this.id;
        result.name       = this.name;
        result.first      = this.first;
        result.mail       = this.mail;
        result.identifier = this.identifier;
        result.password   = this.password;
        if(this.Role) result.role = this.Role.responsify();
        return result;
      }
    }
  });
  return User;
};
