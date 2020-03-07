const express = require('express');
const Controller = require('./controller');

const routes = express.Router();

routes.get('/user/:username', Controller.getUser);

module.exports = routes;
