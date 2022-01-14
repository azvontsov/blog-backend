// DEPENDENCIES

// get .env variables
require("dotenv").config;
// pull PORT from .env, give default value of 3001
const { PORT = 3001, DATABASE_URL } = process.env;
// import express from 'express'
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middleware ...req => middleware => route => res
const cors = require("cors");
const morgan = require("morgan");

// DATABASE CONNECTION

// MIDDLEWARE

// ROUTES

// Create a test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// LISTENERS
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
