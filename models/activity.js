"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.User,  {
        foreignKey: {
          name: 'ownerId',
          allowNull: false
        }
      });
      Activity.belongsToMany(models.Skill, { through: "ActivitySkills" });
      Activity.belongsToMany(models.User, { through: "ActivityParticipants" });
    }
    //User : Activity =  1 : N
    //Activity.userid = ...
  }
  Activity.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      intro: DataTypes.STRING,
      participationCriteria: DataTypes.STRING,
      rule: DataTypes.STRING,

      numberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  return Activity;
};
