const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../models/student");
const Professor = require("../models/professor");

const ProtectedRoutes = express.Router();
ProtectedRoutes.use((req, res, next) => {
  // check header for the token
  var token = req.headers["access-token"];

  // decode token
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token, process.env.PROF_SECRET_KEY, (err, authData) => {
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

// Prof get his module's notes
ProtectedRoutes.get("/notes/:module", async (req, res) => {
  const avalableModules = await Professor.find(
    { matricule: req.authData.matricule },
    { _id: 0, modules: 1 }
  );
  const modulesArray = avalableModules.map(x => x.modules);
  const modules = modulesArray[0];

  if (modules.includes(req.params.module)) {
    console.log(req.params.module.toUpperCase());
    const studentsNotes = await Student.find(
      { "notes.module": req.params.module.toUpperCase() },
      {
        firstname: 1,
        lastname: 1,
        notes: { $elemMatch: { module: req.params.module.toUpperCase() } }
      }
    );
    res.send(studentsNotes);
  } else {
    res
      .status(403)
      .send({ error: "You dont have permission to see this module" });
  }
});
// Prof set his module's notes
ProtectedRoutes.post("/notes", async (req, res) => {
  //Get available modules
  const avalableModules = await Professor.find(
    { matricule: req.authData.matricule },
    { _id: 0, modules: 1 }
  );
  const modulesArray = avalableModules.map(x => x.modules);
  const modules = modulesArray[0];
  //
  if (modules.includes(req.body.module)) {
    const updatedNotes = await Student.updateOne(
      { matricule: req.body.studentMatricule, "notes.module": req.body.module.toUpperCase() },
      { $set: { "notes.$.note": req.body.note } } //check if valide note >=0 <=20
    );

    res.send(updatedNotes);
  } else {
    res
      .status(403)
      .send({ error: "You dont have permission to edit this module" });
  }
});

ProtectedRoutes.get("/marks", async (req, res) => {
  const studentData = req.authData;
  const student = await Student.find(
    { matricule: studentData.matricule },
    "matricule notes"
  );
  res.send(student);
});

//Consulter note par matiere
ProtectedRoutes.get("/marks/:module", async (req, res) => {
  const studentData = req.authData;
  const module = req.params.module; //TODO: check if not null and is a valid module
  const student = await Student.find(
    { matricule: studentData.matricule },
    { notes: { $elemMatch: { module } } }
  );
  res.send(student);
});

module.exports = ProtectedRoutes;
