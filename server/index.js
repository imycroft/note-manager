const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
const mongoUrl = "mongodb://localhost:27017/notedb";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//protected routes

//admin protected route
const  Admin = require("./routes/admin") 
app.use('/administration', Admin);

//admin login & register
const Login = require("./routes/login")
app.use('/admin', Login)

//student route
const  ProtectedStudent = require("./routes/protected-student") 
app.use('/api/student', ProtectedStudent);

//internal requiers
const students = require("./routes/students");
app.use("/students", students);

// Connect to the db
mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async (err, db) => {
    if (err) throw err;

    await console.log("connected to mongodb");
  }
);

//start the server
app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
