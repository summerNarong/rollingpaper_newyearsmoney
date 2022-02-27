const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const Message = require('../models/message');
const Image = require('../models/image');
const router = express.Router();
const sequelize = require('sequelize');
const dayjs = require('dayjs');
//const { QueryTypes } = require('sequelize');
const db = require('../models/index.js');

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

router.get('/myroom', async (req, res, next) => {
  var url = req.url; // /myroom/?ref=...
  var arr = url.split('='); // [/myroom/?ref, ref값]
  var refValue = arr[1];

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
        where: { ref: refValue },
      });
      const msgs = await Message.findAll({
        where: { ref: refValue },
        include: [
          {
            model: Image,
          },
        ],
      });
      var date = dayjs(host.createdAt);
      date = date.format('YYYY년 MM월 DD일');

      res.render('myroom', {
        hostuser: host,
        url: '/sendmsg/?ref=' + host.ref,
        msg: msgs,
        date: date,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
});

router.get('/sendmsg', (req, res) => {
  var url = req.url; // /myroom/?ref=...
  var refValue = url.split('=')[1]; // [/myroom/?ref, ref값]
  res.render('sendmsg', { url: '/post/?ref=' + refValue });
});

router.post('/post', async (req, res) => {
  try {
    var url = req.url; // /myroom/?ref=...
    var refValue = url.split('=')[1]; // [/myroom/?ref, ref값]

    const post = await Message.create({
      sender: req.body.sendername,
      textmsg: req.body.content,
      ref: refValue,
      imageId: req.body.money,
    });

    let query =
      'select sum(price) as total from Message join Image on Message.imageId=Image.id where Message.ref=:ref';
    let sum = await db.sequelize.query(query, {
      replacements: { ref: refValue },
      type: db.sequelize.QueryTypes.SELECT,
      raw: true,
    });

    User.update(
      {
        asset: sum[0].total,
      },
      {
        where: { ref: refValue },
      }
    );

    res.redirect('/complete');
  } catch (error) {
    console.error(error);
  }
});

router.get('/complete', async (req, res) => {
  res.render('complete');
});

module.exports = router;
