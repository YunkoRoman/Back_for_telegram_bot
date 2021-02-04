/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('chat_bot_roles', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: Sequelize.DataTypes.ENUM('regular', 'admin', 'superAdmin'),
    updatedAt: Sequelize.DataTypes.DATE,
    createdAt: Sequelize.DataTypes.DATE,
  }).then(() => queryInterface.createTable('chat_bot_user_types', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userType: new Sequelize.DataTypes.STRING(128),
    updatedAt: Sequelize.DataTypes.DATE,
    createdAt: Sequelize.DataTypes.DATE,
  })).then(() => queryInterface.createTable('chat_bot_users', {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    telegramId: {
      type: new Sequelize.DataTypes.STRING(32),
      unique: true,
      allowNull: false,
    },
    telegramName: {
      type: new Sequelize.DataTypes.STRING(32),
      allowNull: true,
    },
    name: {
      type: new Sequelize.DataTypes.STRING(32),
      allowNull: false,
    },
    phoneNumber: {
      type: new Sequelize.DataTypes.STRING(64),
      allowNull: true,
      validate: {
        is: '',
      },
    },
    city: {
      type: new Sequelize.DataTypes.STRING(32),
      allowNull: true,
    },
    step: {
      type: Sequelize.DataTypes.JSON,
    },
    roleId: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'chat_bot_roles', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    typeId: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'chat_bot_user_types', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    updatedAt: Sequelize.DataTypes.DATE,
    createdAt: Sequelize.DataTypes.DATE,
  })),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.dropTable('chat_bot_users', { transaction: t }),
    queryInterface.dropTable('chat_bot_roles', { transaction: t }),
    queryInterface.dropTable('chat_bot_user_types', { transaction: t }),
    queryInterface.dropTable('chat_bot_answered_questions', { transaction: t }),
  ])),
};
