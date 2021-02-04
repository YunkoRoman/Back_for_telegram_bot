/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('chat_bot_faqs', [
    {
      id: 1,
      question: 'faculty',
      answer: 'Here is our faculty info',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      question: 'university',
      answer: 'Here is our university info',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('chat_bot_faqs', null, {}),
};
