const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
//const config = require("../config/config");
const User = require('./user');
const Message = require('./message');
const Image = require('./image');

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Message = Message;
db.Image = Image;

User.init(sequelize);
Message.init(sequelize);
Image.init(sequelize);

User.associate(db);
Message.associate(db);
Image.associate(db);

module.exports = db;
