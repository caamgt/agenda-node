const express = require('express');

const app = express();

app.post('/logout', (req, res) => {
    res.send('logout');
});

module.exports = app;