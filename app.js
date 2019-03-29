const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var flash = require('express-flash-messages');
var session = require('express-session');

const port = 3000;
//cofigure app for flash messages


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'epiwell',
    database: 'node_api',
    dateStrings:true
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;
// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use(flash());
app.use(session({ cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false}));
/*app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ cookie: { maxAge: 600 }}));
app.use(flash());*/


//define controllers for apis 
var registerController=require('./controllers/register-controller');
var loginController=require('./controllers/login-controller');
var passwordController=require('./controllers/password-controller');
var userController=require('./controllers/user-controller');
var eventController=require('./controllers/event-controller');



//routes of login,register and forgot password api starts
app.post('/api/register',registerController.register);
app.post('/api/verify-otp',registerController.verifyOtp);
app.post('/api/resend-otp',registerController.resendOtp);
app.get('/verify-email/:token',registerController.verifyEmail);
app.post('/api/update-profile',registerController.updateProfile);
app.post('/api/validate',registerController.joiValidation);
app.post('/api/login',loginController.login);
app.post('/api/social-login',loginController.socialLogin);
app.post('/api/change-password',passwordController.changePassword);
app.post('/api/forgot-password',passwordController.forgotPassword);
app.post('/api/resend-email',passwordController.resendEmail);
app.get('/reset/:token',passwordController.resetPassword);
app.post('/reset-password',passwordController.ResetpasswordNow);
app.post('/api/upload-video',userController.uploadVideo);
app.post('/api/upload-file',userController.uploadFile);
app.post('/api/user-info',userController.UserInfo);
app.post('/api/send-push',userController.PushNotifications);
app.post('/api/show-user-detail',userController.showUser);
//routes start for events
app.post('/api/add-event',eventController.AddEvents);
app.post('/api/delete-event',eventController.DeleteEvents);
app.post('/api/list-event',eventController.ListEvents);
app.post('/api/edit-event',eventController.EditEvents);
app.post('/api/user-event',eventController.userEvents);
app.post('/api/filter-event',eventController.filterEvents);
app.post('/api/add-favorite-event',eventController.addToFavorite);
app.post('/api/remove-favorite-event',eventController.removeToFavorite);
app.post('/api/particular-event',eventController.particularEvent);
app.post('/api/organizer-event',eventController.OrganizerEvents);
app.post('/api/user-favourite-event',eventController.userFavoriteEvents);



//google login api routes start

//app listner port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

