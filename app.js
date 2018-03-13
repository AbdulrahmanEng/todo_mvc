const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('dotenv').load();
const expressValidator = require('express-validator');

// Create an instance of Express.
const app = express();

// Set port number.
app.set('port', 3000);

// Set logging.
app.use(logger('dev'));

// Configure body parser for incoming requests.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
// Initialize express-session.
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false
}));

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
    sess.cookie.maxAge = 3600000
}


// Set view directory and template engine.
app.set('views', './views');
app.set('view engine', 'ejs');


// Define static directory.
app.use('/static', express.static(path.join(__dirname, 'public')));

// Import routes.
const home = require('./routes/home');
const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const users = require('./routes/users');
const todos = require('./routes/todos');

// Define routes.
app.use('/', home);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/users', users);
app.use('/todos', todos);

// Import database models.
const models = require('./database/models');

// Syncronise database.
models.sequelize.sync().then(() => {
    console.log(`Connected to ${process.env.NODE_ENV} database.`);
    // Open port and start Express server.
    app.listen(app.get('port'), (error) => {
        if (error) {
            console.error(error);
        }
        console.log(`Express running at port ${app.get('port')}`);
    });
}).catch((err) => {
    console.error(err, 'Could not sync with the database.')
});

module.exports = app;