const { ObjectId } = require("mongodb");

const { postSchema } = require("../shared/schema");
const db = require("../shared/mongo");

const service = {
  async findPosts(req, res) {
    try {
      // Get all posts specific to logged user
      const data = await db.posts.find({ userId: req.user.userId }).toArray();

      res.send(data);
    } catch (err) {
      console.log("Error Reading Posts - ", err);
      res.sendStatus(500);
    }
  },
  async insertPost(req, res) {
    try {
      // Request Body Validation
      const { error, value } = await postSchema.validate(req.body);
      if (error)
        return res.status(400).send({
          error: "Validation failed",
          message: error.details[0].message,
        });

      // Insert Post along with logged user
      const { insertedId: _id } = await db.posts.insertOne({
        ...value,
        userId: req.user.userId,
      });

      res.send({ ...value, _id });
    } catch (err) {
      console.log("Error Inserting Post - ", err);
      res.sendStatus(500);
    }
  },
  async updatePost(req, res) {
    try {
      // Request Body Validation
      const { error, value } = await postSchema.validate(req.body);
      if (error)
        return res.status(400).send({
          error: "Validation failed",
          message: error.details[0].message,
        });

      // Check post belongs to logged user
      const post = await db.posts.findOne({
        _id: ObjectId(req.params.id),
        userId: req.user.userId,
      });
      if (!post)
        return res
          .status(401)
          .send({ error: "You don't have access to this post" });

      // Update Post
      const { value: updatedValue } = await db.posts.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $set: { ...value } },
        { returnDocument: "after" }
      );

      res.send(updatedValue);
    } catch (err) {
      console.log("Error Updating Post - ", err);
      res.sendStatus(500);
    }
  },
  async deletePost(req, res) {
    try {
      // Check post belongs to logged user
      const post = await db.posts.findOne({
        _id: ObjectId(req.params.id),
        userId: req.user.userId,
      });
      if (!post)
        return res
          .status(401)
          .send({ error: "You don't have access to this post" });

      // Delete post
      await db.posts.deleteOne({ _id: ObjectId(req.params.id) });

      res.end();
    } catch (err) {
      console.log("Error Deleting Post - ", err);
      res.sendStatus(500);
    }
  },
};

module.exports = service;
