var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/protected', auth.loggedInUser, (req, res, next) => {
    res.send("Protected Resource");  
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/users/login'}), (req, res) => {
  res.redirect('/home');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/login'}), (req, res) => {
  res.redirect('/home');
});

module.exports = router;
