const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const responsables = express.Router();
const Responsable = require("../models/responsable");

responsables.use(cors());

process.env.RESP_SECRET_KEY = "%f_G5zZ!";

//use of async/await
responsables.post("/login", async (req, res) => {
  const responsable = await Responsable.findOne({
    matricule: req.body.matricule
  });
  if (responsable) {
    if (bcrypt.compareSync(req.body.password, responsable.password)) {
      const payload = {
        _id: responsable._id,
        firstname: responsable.firstname,
        lastname: responsable.lastname,
        matricule: responsable.matricule,
        password: responsable.password
      };
      let token = jwt.sign(payload, process.env.RESP_SECRET_KEY, {
        expiresIn: 1440
      });
      res.send(token);
    } else {
      res.json({
        error: "Username or password incorrect "
      });
    }
  } else {
    res.json({
      error: "Username or password incorrect "
    });
  }
});

module.exports = responsables;
