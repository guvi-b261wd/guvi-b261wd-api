const route = require("express").Router();

const service = require("../services/posts.service");

route.get("/", service.findPosts);
route.post("/", service.insertPost);
route.put("/:id", service.updatePost);
route.delete("/:id", service.deletePost);

module.exports = route;
