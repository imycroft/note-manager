const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Responsable = require("../models/responsable");
const Student = require("../models/student");

const ProtectedRoutes = express.Router();
ProtectedRoutes.use((req, res, next) => {
  // check header for the token
  var token = req.headers["access-token"];

  // decode token
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token, process.env.RESP_SECRET_KEY, (err, authData) => {
      if (err) {
        return res.json({ message: "invalid token" });
      } else {
        // if everything is good, save to request for use in other routes
        req.authData = authData;
        next();
      }
    });
  } else {
    // if there is no token

    res.send({
      message: "No token provided."
    });
  }
});
!// Create new student
ProtectedRoutes.post("/students", (req, res) => {
  const today = new Date();
  const studentData = {
    matricule: req.body.matricule,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: "",
    modules: [
      { module: "AAW", note: "", pv: "" },
      { module: "MSSC", note: "", pv: "" },
      { module: "SRI", note: "", pv: "" },
      { module: "IGR", note: "", pv: "" },
      { module: "MTS", note: "", pv: "" },
      { module: "ANGLAIS", note: "", pv: "" },
      { module: "GCC", note: "", pv: "" },
      { module: "CSE", note: "", pv: "" }
    ],
    PV_final: {
      Moyenne: "",
      Remarque: "",
      Reclamation: ""
    },
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

module.exports = ProtectedRoutes;
