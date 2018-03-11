const express = require('express');
const app = express();

app.set('views', __dirname);
app.set('view engine', 'ejs');

/* GET home page. */ 
app.get('/', (req, res) => {
    res.render('home', {loggedIn: req.session.user!==undefined});
});

module.exports = app;