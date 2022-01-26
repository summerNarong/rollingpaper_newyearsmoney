const Sequelize = require("sequelize");

module.exports = class Message extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        sender: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        textmsg: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Message",
        tableName: "Message",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_bin",
      }
    );
  }

  static associate(db) {
    db.Message.belongsTo(db.User, {
      foreignKey: "receiverId",
      targetKey: "id",
    });
    db.Message.belongsTo(db.Image, {
      foreignKey: "imageId",
      targetKey: "id",
    });
  }
};
