const express = require('express');
const app = express();

const users = [
    {name:'john'},
    {name:'jane'},
    {name: 'jack'},
    {name: 'jill'}
];

app.get('/', (req, res) => {
    res.send(users);
});

module.exports = app;