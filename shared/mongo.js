const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URL);

module.exports = {
  // Complete Connection
  db: null,

  // Connection Specific to Collections
  posts: null,
  users: null,

  async connect() {
    //   Connection to Database
    await client.connect();
    console.log("Connected to Mongo -", process.env.MONGODB_URL);

    // Selecting the Database
    this.db = client.db(process.env.MONGODB_NAME);
    console.log("Selected Database -", process.env.MONGODB_NAME);

    // Initialize Collections
    this.posts = this.db.collection("posts");
    console.log("Initialized Collection - posts");
    this.users = this.db.collection("users");
    console.log("Initialized Collection - users");
  },
};
