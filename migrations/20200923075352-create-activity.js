'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      intro: {
        type: Sequelize.STRING
      },
      participationCriteria: {
        type: Sequelize.STRING
      },
      rule: {
        type: Sequelize.STRING
      },
      numberOfPeople: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      location: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Activities', {
      fields: ['ownerId'],
      type: "foreign key",
      references: {
        table: 'Users',
        field: 'id' 
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Activities');
  }
};