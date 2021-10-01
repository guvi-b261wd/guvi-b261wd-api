const route = require("express").Router();

const service = require("../services/users.service");

route.post("/register", service.register);
route.post("/login", service.login);

module.exports = route;
