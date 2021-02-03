module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('chat_bot_users', [{
    telegramId: 'telid1',
    telegramName: '@Doe',
    name: 'John',
    phoneNumber: '00004444',
    city: 'Kyiv',
    step: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
