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
    password: req.body.password,
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
  const result = await Student.findOne({
    matricule: req.body.matricule
  });
  if(result) {
      if(bcrypt.compareSync(req.body.password, result.password)){
          res.send('Logged in')
      } else {
          res.send('password incorrect !')
      }
  }
});

module.exports = students;
