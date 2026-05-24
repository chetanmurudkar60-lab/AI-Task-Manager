const Task = require("../models/Task");

const generateTaskSuggestions =
  require("../services/geminiService");


// CREATE TASK
const createTask = async (req, res) => {

  try {

    const { title, description } =
      req.body;

    const aiSuggestions =
      await generateTaskSuggestions(
        description
      );

    const task = new Task({

      title,

      description,

      subtasks:
        aiSuggestions.subtasks,

      priority:
        aiSuggestions.priority,

      timeline:
        aiSuggestions.timeline,

      tools:
        aiSuggestions.tools,

    });

    const savedTask =
      await task.save();

    res.status(201).json(savedTask);

  } catch (error) {

    console.log(
      "CREATE TASK ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL TASKS
const getTasks = async (req, res) => {

  try {

    const tasks =
      await Task.find()
        .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (error) {

    console.log(
      "GET TASKS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK
const updateTask = async (req, res) => {

  try {

    const { title, description } =
      req.body;

    const aiSuggestions =
      await generateTaskSuggestions(
        description
      );

    const updatedTask =
      await Task.findByIdAndUpdate(

        req.params.id,

        {
          title,
          description,

          subtasks:
            aiSuggestions.subtasks,

          priority:
            aiSuggestions.priority,

          timeline:
            aiSuggestions.timeline,

          tools:
            aiSuggestions.tools,
        },

        {
          returnDocument: "after",
        }
      );

    res.json(updatedTask);

  } catch (error) {

    console.log(
      "UPDATE TASK ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE TASK
const deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Task deleted successfully",
    });

  } catch (error) {

    console.log(
      "DELETE TASK ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};


// TOGGLE TASK COMPLETION
const toggleTaskCompletion =
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        );

      task.completed =
        !task.completed;

      await task.save();

      res.json(task);

    } catch (error) {

      console.log(
        "TOGGLE TASK ERROR:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  };


// EXPORTS
module.exports = {

  createTask,

  getTasks,

  updateTask,

  deleteTask,

  toggleTaskCompletion,

};