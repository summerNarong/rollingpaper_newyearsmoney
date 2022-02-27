const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(45),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        asset: {
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
        ref: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'User',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_bin',
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Message, {
      foreignKey: 'ref',
      sourceKey: 'ref',
    });
  }
};
