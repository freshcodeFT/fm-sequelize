const express = require('express');

const app = express();
app.use(express.json()); // data stream -> json -> js object -> req.body

module.exports = app;