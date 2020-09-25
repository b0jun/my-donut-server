'use strict';
const {
  Model
} = require('sequelize');
const { setPassword } = require(__base + 'lib/auth');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Activity, {
        foreignkey: 'ownerid'
      });

      User.belongsToMany(models.Skill, { through: 'UserSkills'});
      User.belongsToMany(models.Activity, { through: 'ActivityParticipants' });

    }
  };

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    username: {
      type:DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latlon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeValidate: (user) => {
        const [hashedPassword, salt] = setPassword(user.password);

        user.password = hashedPassword;
        user.salt = salt;
      }
    }
  });
  
  return User;
};