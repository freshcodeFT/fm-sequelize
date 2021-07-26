'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'users_to_groups',
      'created_at',
      Sequelize.DATE,
      {
        allowNull: false,
      }
    );
    await queryInterface.addColumn(
      'users_to_groups',
      'updated_at',
      Sequelize.DATE,
      {
        allowNull: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
