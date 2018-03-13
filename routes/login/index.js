const express = require('express');
const app = express();
const database = require('../../database');

app.set('views', __dirname);
app.set('view engine', 'ejs');

/* GET login page. */
app.get('/', (req, res) => {
    res.render('form', {
        title: 'Log In',
        flash: {
            message: null
        },
        errors: req.session.errors,
        loggedIn: req.session.user!==undefined
    });
});

/* POST home page. */
app.post('/', (req, res) => {
    database.auth.login(req, res);
});

module.exports = app;