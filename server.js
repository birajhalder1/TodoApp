// Require package
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//const path = require("path");

// dotenv configuration
require("dotenv").config();

// Require api route
const todos = require("./routes/api/todo");

const app = express();

//app.use(express.static(path.join(__dirname, "client/build")));

// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config DB
const db = require("./config/keys").mongoURI;

// Connect mongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB are connected"))
  .catch(err => console.log(err));


// Middleware Use admin Routes
app.use("/api/todo", todos);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is running port no ${port}`));
