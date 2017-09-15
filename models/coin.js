'use strict';

/************* Sequelize for Coin model **************/

module.exports = function(sequelize, DataTypes) {
  var Coin = sequelize.define('Coin', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    value : {
      type : DataTypes.STRING,
      allowNull : false
    },
    year : {
      type : DataTypes.INTEGER(4),
      allowNull : false
    },
    description : {
      type : DataTypes.STRING,
      allowNull : false
    },
    registration : {
      type : DataTypes.STRING,
      allowNull : false
    },
    price : {
      type : DataTypes.FLOAT,
      allowNull : true
    },
    royal : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : 0
    }
  }, {
    paranoid : true,
    underscored : true,
    freezeTableName : true,
    classMethods : {
      associate : function(models) {
        Coin.belongsTo(models.Country);
        Coin.belongsTo(models.Metal);
        Coin.belongsTo(models.Wear);
      }
    },
    instanceMethods : {
      responsify : function() {
        let result          = {};
        result.id           = this.id;
        result.value        = this.value;
        result.year         = this.year;
        result.description  = this.description;
        result.registration = this.registration;
        result.price        = this.price;
        result.royal        = this.royal;
        if(this.Country) result.country = this.Country.responsify();
        if(this.Metal) result.metal = this.Metal.responsify();
        if(this.Wear) result.wear = this.Wear.responsify();
        return result;
      }
    }
  });
  return Coin;
};
