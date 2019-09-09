const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Professor = require("../models/professor");
const Responsable = require("../models/responsable");
const Admin = require("../models/admin");
const ProtectedRoutes = express.Router();

ProtectedRoutes.use((req, res, next) => {
  // check header for the token
  var token = req.headers["access-token"];

  // decode token
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token, process.env.ADMIN_SECRET_KEY, (err, authData) => {
      if (err) {
        return res.status(403).send({
          message: "invalid token"
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.authData = authData;
        next();
      }
    });
  } else {
    // if there is no token

    res.status(403).send({
      message: "No token provided."
    });
  }
});

//Get admin profile
ProtectedRoutes.get("/", async (req, res) => {
  const adminData = req.authData;
  const admin = await Admin.findOne(
    { matricule: adminData.matricule },
    "matricule firstname lastname"
  );
  res.send(admin);
});

// Get all students
ProtectedRoutes.get("/students/all", async (req, res) => {
  const students = await Student.find({}, { password: 0 });
  res.send({ students });
});

// Create new student
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

// Edit a Student
ProtectedRoutes.put("/students/", async (req, res) => {
  const student = await Student.updateOne(
    { matricule: req.body.matricule },
    { $set: { firstname: req.body.firstname, lastname: req.body.lastname } }
  );
  res.send({ student });
});

// Create new responsable
ProtectedRoutes.post("/responsables", async (req, res) => {
  Responsable.countDocuments({}, function(err, count) {
    console.log("Number of resps: ", count);
    if (count == 0) {
      const today = new Date();
      const respData = {
        matricule: req.body.matricule,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: "",
        created: today
      };
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        respData.password = hash;
        Responsable.create(respData)
          .then(resp => {
            res.json({
              status: resp.matricule + " registred"
            });
          })
          .catch(err => {
            res.send("Error: " + err);
          });
      });
    } else res.status(403).send({ error: "Can't create more responsables" });
  });
});

// Delete responsable
ProtectedRoutes.delete("/responsables/:matricule", async (req, res) => {
  await Responsable.findOneAndRemove(
    {
      matricule: req.params.matricule
    },
    (err, user) => {
      if (err) res.send(err);
      else {
        if (!user) res.status(404).send({ error: "Responsable not found" });
        else
          res.send({
            success: true,
            user
          });
      }
    }
  );
});

// Create new professor
ProtectedRoutes.post("/professors", async (req, res) => {
  const today = new Date();
  const modules = req.body.modules.split(","); //TODO: check if modules exist
  const professorData = {
    matricule: req.body.matricule,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    modules: modules,
    created: today
  };

  Professor.findOne({
    matricule: req.body.matricule
  })
    .then(professor => {
      if (!professor) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          professorData.password = hash;
          Professor.create(professorData)
            .then(professor => {
              res.json({
                status: professor.matricule + " registred"
              });
            })
            .catch(err => {
              res.send("Error: " + err);
            });
        });
      } else {
        res.json({
          error: "Professor already exists"
        });
      }
    })
    .catch(err => {
      res.send("Error: " + err);
    });
});

// Delete a professor
ProtectedRoutes.delete("/professors/:matricule", async (req, res) => {
  await Professor.findOneAndRemove(
    {
      matricule: req.params.matricule
    },
    (err, user) => {
      if (err) res.send(err);
      else {
        if (!user) res.status(404).send({ error: "Professor not found" });
        else
          res.send({
            success: true,
            user
          });
      }
    }
  );
});

module.exports = ProtectedRoutes;
