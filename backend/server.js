const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const connectDB =
  require("./config/db");

const taskRoutes =
  require("./routes/taskRoutes");

const authRoutes =
  require("./routes/authRoutes");

const app = express();


// CONNECT DATABASE
connectDB();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/auth",
  authRoutes
);


// TEST ROUTE
app.get("/", (req, res) => {

  res.send(
    "AI Task Manager API Running"
  );
});


// SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `Server running on port ${PORT}`
    );
  }
);