'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Activity);

      User.belongsToMany(models.Skill, { through: 'UserSkills' });
      User.belongsToMany(models.Activity, { through: 'ActivityParticipants' });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      githubId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latlon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
     
      modelName: 'User',

    }
  );
  return User;
};
