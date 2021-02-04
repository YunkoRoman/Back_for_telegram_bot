module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('chat_bot_user_types', [
    {
      id: 1,
      userType: 'entrant',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      userType: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      userType: 'parent',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      userType: 'teacher',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('chat_bot_user_types', null, {}),
};
