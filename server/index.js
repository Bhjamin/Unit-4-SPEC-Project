require("dotenv").config();

const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");
User.hasMany(Post)
Post.belongsTo(User)

const PORT = process.env.SERVER_PORT;

// Middleware

const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Importing functions

const { isAuthenticated } = require("./middleware/isAuthenticated");
const { login, register } = require("./controller/auth");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controller/posts");

// Endpoints

app.post(`/register`, register);
app.post(`/login`, login);
app.get(`/posts`, getAllPosts);
app.get(`/userposts/:userId`, getCurrentUserPosts, isAuthenticated);
app.post(`/posts`, addPost, isAuthenticated);
app.put(`/posts/:id`, editPost, isAuthenticated);
app.delete(`/posts/:id`, deletePost, isAuthenticated);


// Database sync

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Crying my eyes out on port ${PORT}`);
  });
});
