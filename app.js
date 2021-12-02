const express = require('express');
const cors = require('cors');
const setRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

setRoutes(app);

app.use((err, req, res, next) => {
    console.log('err: ', err);
    res.status(500);
    res.send({ error: err });
});

module.exports = app;
