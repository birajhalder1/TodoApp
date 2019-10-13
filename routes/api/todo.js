const express = require("express");
const router = express.Router();

const todoList = require("../../models/Todo");

// @route   GET api/todo/test
// @desc    Tests student route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Todo Works" }));

// @route   POST api/todo/todoInfo
// @desc    Todo information route
// @access  Public
router.post(
  "/todoInfo",

  (req, res) => {
    const todo = {
      name: req.body.name,
      taskName: req.body.taskName
    };
    const newTodo = new todoList(todo);
    newTodo.save().then(result => res.json("Todo information are saved"));
  }
);

// @route   POST api/todo/getSingle/:taskName
// @desc    Search single todo name
// @access  Public
router.get(
  "/getSingle/:taskName",

  (req, res) => {
    let taskName = req.params.taskName;
    todoList.findOne({ taskName }).then(result => res.json(result));
  }
);

// @route   POST api/todo/get/:id
// @desc    Search single todo by id
// @access  Public
router.get(
  "/get/:id",

  (req, res) => {
    let id = req.params.id;
    todoList.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/todo/getAll
// @desc    List of all todo
// @access  Public
router.get(
  "/getAll",

  (req, res) => {
    todoList.find().then(results => res.json(results));
  }
);

// @route   POST api/todo/update/:id
// @desc    Update single todo by id
// @access  Public
router.post(
  "/update/:id",

  (req, res) => {
    //console.log("hittd");
    let id = req.params.id;
    const todo = {
      name: req.body.name,
      taskName: req.body.taskName,

    };
    todoList
      .findOneAndUpdate({ _id: id }, { $set: todo }, { new: true })
      .then(responce => res.json(responce));
  }
);

// @route  DELETE api/todo/delete/:id
// @desc   Todo delete route
// @access Public
router.delete(
  "/delete/:id",

  (req, res) => {
    let id = req.params.id;
    todoList
      .deleteOne({ _id: id })
      .then(responce => res.json({ msg: "deleted successfully" }));
  }
);

module.exports = router;
