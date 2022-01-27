const passport = require('passport');
const kakao = require('./kakaostrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.ref);
  });

  passport.deserializeUser((ref, done) => {
    User.findOne({ where: { ref } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  kakao();
};
