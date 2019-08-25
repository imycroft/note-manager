const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const students = express.Router();
const Student = require("../models/student");

students.use(cors());

process.env.SECRET_KEY = "l!F0t4Ch";

students.post("/register", (req, res) => {
  const today = new Date();
  const studentData = {
    matricule: req.body.matricule,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: '',
    notes: [
      { module: "AAW", note: "" },
      { module: "MSSC", note: "" },
      { module: "SRI", note: "" },
      { module: "IGR", note: "" },
      { module: "MTS", note: "" },
      { module: "ANGLAIS", note: "" },
      { module: "GCC", note: "" },
      { module: "CSE", note: "" }
    ],
    created: today
  };

  Student.findOne({
    matricule: req.body.matricule
  })
    .then(student => {
      if (!student) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          studentData.password = hash;
          Student.create(studentData)
            .then(student => {
              res.json({
                status: student.matricule + " registred"
              });
            })
            .catch(err => {
              res.send("Error: " + err);
            });
        });
      } else {
        res.json({ error: "Student already exists" });
      }
    })
    .catch(err => {
      res.send("Error: " + err);
    });
});

//use of async/await
students.post("/login", async (req, res) => {
  const student = await Student.findOne({
    matricule: req.body.matricule
  });
  if (student) {
    if (bcrypt.compareSync(req.body.password, student.password)) {
      const payload = {
        _id: student._id,
        firstname: student.firstname,
        lastname: student.lastname,
        matricule: student.matricule,
        password: student.password
      };
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 1440
      });
      res.send(token);
    } else {
      res.json({ error: "Username or password incorrect " });
    }
  } else {
    res.json({ error: "Username or password incorrect " });
  }
});

module.exports = students;
