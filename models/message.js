const Sequelize = require('sequelize');

module.exports = class Message extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        sender: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        textmsg: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Message',
        tableName: 'messages',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Message.belongsTo(db.User, {
      foreignKey: 'receiver',
      targetKey: 'id',
    });
    db.Message.belongsTo(db.Image, {
      foreignKey: 'img',
      targetKey: 'id',
    });
  }
};
