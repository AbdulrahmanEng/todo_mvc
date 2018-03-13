const express = require('express');
const app = express();
const database = require('../../database');

app.set('views', __dirname);
app.set('view engine', 'ejs');

/* GET signup page. */
app.get('/', (req, res) => {   
    res.render('form', {
        title: 'Register',
        flash: {
            message: null
        },
        errors: req.session.errors,
        loggedIn: req.session.user!==undefined
    });
});

/* POST to signup page. */
app.post('/', (req, res) => {
    database.auth.register(req, res);
});

module.exports = app;