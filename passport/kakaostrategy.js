const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const shortid = require('shortid');

const User = require('../models/user');

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account.email,
              nick: profile.displayName,
              snsId: profile.id,
              asset: 0,
              ref: shortid.generate(),
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

/*const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const db = require("../utils");
const conn = db.init();

db.connect(conn);

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          var sql = "select * from User where snsId = ?";
          var exUser = await conn.query(sql, profile.id, function (err) {
            console.log("query is not exected." + err);
          });
          if (exUser) {
            done(null, exUser);
          } else {
            var sql2 = "insert into User (email, nick, snsId) values (?,?,?,?)";
            var email = profile._json && profile._json.kaccount_email;
            var nick = profile.displayName;
            var snsId = profile.id;
            var newUser = await conn.query(
              sql2,
              [email, nick, snsId],
              function (err) {
                console.log("query is not exected." + err);
              }
            );
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

conn.end();
*/
