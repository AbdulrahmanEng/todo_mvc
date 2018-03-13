const express = require('express');
const app = express();

const restrict = require('../../middleware/restrict');

const users = [
    {name:'john'},
    {name:'jane'},
    {name: 'jack'},
    {name: 'jill'}
];

app.get('/', restrict, (req, res) => {
    res.send(users);
});

module.exports = app;