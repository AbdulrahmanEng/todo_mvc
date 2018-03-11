const express = require('express');
const app = express();

const restrict = require('../../middleware/restrict');

const tasks = [
    { title: 'first' },
    { title: 'second' },
    { title: 'third' },
    { title: 'fouth' }
];

app.get('/', restrict, (req, res) => {
    console.log('User>>>>>>>>>>>>>>>>>>');
    console.log(req.session.user);
    res.send(tasks);
});

module.exports = app;