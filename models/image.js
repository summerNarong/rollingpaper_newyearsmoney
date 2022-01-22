const Sequelize = require("sequelize");

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        imageName: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Image",
        tableName: "images",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Image.hasMany(db.Message, {
      foreignKey: "img",
      sourceKey: "id",
    });
  }
};
