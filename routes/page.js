const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/', (req, res, next) => {
  res.render('main', {
    title: 'hi',
  });
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/myroom', async (req, res) => {
  var url = req.url; // /myroom/?ref=...
  var arr = url.split('='); // [/myroom/?ref, ref값]

  if (arr.length == 1) {
    // /myroom
    if (req.user) {
      res.redirect('/myroom/?ref=' + req.user.ref);
    } else {
      res.redirect('/');
    }
  } else {
    try {
      const host = await User.findOne({
        where: { ref: arr[1] },
      });
      res.render('myroom', { hostref: host });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
});

module.exports = router;
