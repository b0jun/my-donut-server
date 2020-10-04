'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'githubId', {
        type: Sequelize.INTEGER,
        allowNull:true
    });

    await queryInterface.addColumn('Users', 'accessToken', {
        type: Sequelize.STRING,
        allowNull:true
    });

    await queryInterface.addColumn('Users', 'refreshToken', {
        type: Sequelize.STRING,
        allowNull:true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'githubId');
    await queryInterface.removeColumn('Users', 'accessToken');
    await queryInterface.removeColumn('Users', 'refreshToken');

  }
};