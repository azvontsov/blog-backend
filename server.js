// DEPENDENCIES

// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3001
const { PORT = 3001, DATABASE_URL } = process.env;
// const PORT = process.env || 3001
// import express from 'express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middleware...req => middleware => route => res
const cors = require("cors");
const morgan = require("morgan");

// DATABASE CONNECTION

// Establish Connection
mongoose.connect(DATABASE_URL);
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error));

// MODELS

const PostSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  tags: String,
  title: String,
  body: String,
  likes: [String],
  comments: [String],
});

const Post = mongoose.model("Posts", PostSchema);

// MiddleWare

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // JSON.parse("{"name":"anton"}") => {name: anton}

// ROUTES

// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// POST INDEX ROUTE - GET
// async/await
app.get("/posts", async (req, res) => {
  try {
    res.json(await Post.find({ limit: 5 }));
  } catch (error) {
    res.status(400).json(error);
  }
});

// POST CREATE ROUTE - POST
app.post("/posts", async (req, res) => {
  try {
    res.json(await Post.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});
// POST DELETE ROUTE - POST
app.delete("/posts/:id", async (req, res) => {
  try {
    res.json(await Post.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});
// POST UPDATE ROUTE - POST
app.put("/posts/:id", async (req, res) => {
  try {
    res.json(await Post.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// LISTENER

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
