// @todo create and log in users without passport. passport is wasting too much time.
const express = require('express');
const app = express();
const database = require('../../database');

app.set('views', __dirname);
app.set('view engine', 'ejs');

// Page data.
const data = {
    title: 'Register',
    flash: {
        message: null
    }
};

/* GET signup page. */
app.get('/', (req, res) => {
    res.render('form', data);
});

/* POST to signup page. */
app.post('/', (req, res) => {
    database.auth.register(req, res);
});

module.exports = app;