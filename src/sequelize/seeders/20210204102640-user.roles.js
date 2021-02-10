module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('chat_bot_roles', [
    {
      id: 0,
      role: 'regular',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      role: 'superAdmin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('chat_bot_roles', null, {}),
};
