let User = require('../models/users');

module.exports = {
    loggedInUser: (req, res, next) => {
        if((req.session && req.session.userId) || (req.session.passport && req.session.passport.user)) {
            next();
        } else {
            req.flash('error', 'Login/Register First');
            req.session.returnsTo = req.originalUrl;
            res.redirect('/users/login');
        }
    },

    userInfo: (req, res, next) => {
        let userId = (req.session && req.session.userId) || (req.session.passport && req.session.passport.user);
        if(userId) {
            User.findById(userId, "name email", (err, user) => {
                if(err) return next(err);
                req.user = user;
                res.locals.user = user;
                next();
            })
        } else {
            req.user = null;
            res.locals.user = null;
            next();
        }
    }
}