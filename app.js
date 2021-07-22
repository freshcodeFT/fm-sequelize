const express = require('express');
const router = require('./router');

const app = express();
app.use(express.json()); // data stream -> json -> js object -> req.body
app.use('/api', router);


module.exports = app;
