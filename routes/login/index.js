const express = require('express');
const app = express();
const database = require('../../database');

app.set('views', __dirname);
app.set('view engine', 'ejs');

// Add middleware to check if user is in session.

// Page data.
const data = {
    title: 'Log In',
    flash: {
        message: null
    }
};

/* GET login page. */
app.get('/', (req, res) => {
    res.render('form', data);
});

/* POST home page. */
app.post('/', (req, res) => {
    database.auth.login(req, res);
});

module.exports = app;