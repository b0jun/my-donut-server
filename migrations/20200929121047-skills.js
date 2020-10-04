"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Skills", [
      {
        name: "C/C++",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C#",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Java",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "JavaScript",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Python",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "GO",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ruby",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rust",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Skills", null, {});
  },
};
