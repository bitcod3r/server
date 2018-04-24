const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const dynamoose = require('dynamoose');
const keys = require('./config/keys'); 
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// set up view engine
app.set('view engine','ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,     // age of the cookie ms
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to dynamodb
local = {
    db:{
        region: keys.dynamodb.dbURL
    }
}
dynamoose.AWS.config.update(local.db)
dynamoose.local(keys.dynamodb.dbURL).then(() => {
    console.log('Connected to DynamoDB')
})

// set up routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

// create home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user});  // req if the user exit logout button appear
})

// port of server
app.listen(8000, () => {
    console.log("App is running on port 8000")
});