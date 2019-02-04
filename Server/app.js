const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

// set view engine
//app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, {
    useMongoClient: true
}, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
// create home route
//app.get('/', (req, res) => {
//    res.render('home', {
//        user: req.user
//    });
//});
app.get('/', function (req, res) {
    res.send('Hello World');
})

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});