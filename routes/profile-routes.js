const router = require('express').Router();

// Check if the user is logged in for fix if the user go to unknow mode
const authCheck = (req, res, next) => {
    if(!req.user){
        // if user it's not logged in
        res.redirect('/auth/login');
    }else{
        //if logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', {user: req.user});
});

module.exports = router;