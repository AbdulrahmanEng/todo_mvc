const express = require('express');
const app = express();

app.set('views', __dirname);
app.set('view engine', 'ejs');

/* GET home page. */ 
app.get('/', (req, res) => {
    res.render('home', {user: req.session.user, loggedIn: req.session.user!==undefined, errors:req.session.errors});
    req.session.errors=null;
});

module.exports = app;