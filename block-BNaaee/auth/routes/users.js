var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => {
  res.render('register');
});



router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) return next(err);
    res.redirect('/users/login');
  })
});

router.post('/login', (req, res, next) => {
  let {email, passwd} = req.body;
  if(!email || !passwd) {
    res.redirect('/users/login');
  }
  User.findOne({email}, (err, user) => {
    if(err) return next(err);
    if(!user) {
      res.redirect('/users/login');
    }
    user.verifyPasswd(passwd, (err, result) => {
      if(err) return next(err);
      if(!result) {
        res.redirect('/users/login');
      }
      req.session.userID = user.id;
      res.redirect('/success');
    })
  })
});
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;
