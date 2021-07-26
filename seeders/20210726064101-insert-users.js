'use strict';

const generateUser = key => ({
  first_name: `Name${key}`,
  last_name: `Surname${key}`,
  email: `email${key}@mail.com`,
  password: `StrongPass${key}`,
  birthday: new Date(2000, 0, key),
  is_male: Math.random() > 0.5,
  created_at: new Date(),
  updated_at: new Date(),
});

const generateUsers = (amount = 50) => {
  return new Array(amount > 600 ? 600 : amount)
    .fill(null)
    .map((_, i) => generateUser(i));
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', generateUsers(120), {});
  },

  down: async (queryInterface, Sequelize) => {},
};
