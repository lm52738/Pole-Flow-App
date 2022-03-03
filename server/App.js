const express = require('express');
const router = express.Router();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(5000);

module.exports = app;