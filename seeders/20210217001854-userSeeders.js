'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Daniel',
      lastName: 'Zermeño',
      email: 'daniel@example.com',
      password: '12345',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Fernando',
      lastName: 'Zermeño',
      email: 'fernando@example.com',
      password: '12345',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};