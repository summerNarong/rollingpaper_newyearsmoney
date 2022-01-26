const Sequelize = require("sequelize");

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        imagename: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        price: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Image",
        tableName: "Image",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_bin",
      }
    );
  }

  static associate(db) {
    db.Image.hasMany(db.Message, {
      foreignKey: "imageId",
      sourceKey: "id",
    });
  }
};
