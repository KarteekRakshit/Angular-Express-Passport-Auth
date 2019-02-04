const router = require('express').Router();
const passport = require('passport');
const cors = require('cors');

// auth login
//router.get('/login', (req, res) => {
//    res.render('login', { user: req.user });
//});

// auth logout
//router.get('/logout', (req, res) => {
//    req.logout();
//    res.redirect('/');
//});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google',{ failureRedirect: '/auth/fail' }), (req, res) => {
    // res.send(req.user);
    var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
    //res.redirect('/profile');
    responseHTML = responseHTML.replace('%value%', JSON.stringify({
        user: req.user
    }));
    res.status(200).send(responseHTML);
});

module.exports = router;
