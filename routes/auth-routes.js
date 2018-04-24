const router = require('express').Router()
const passport = require('passport');

// login
router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

// google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
});

// logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;