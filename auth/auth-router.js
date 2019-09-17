const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("../users/userModel.js");

const router = express.Router();

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: "error" });
      } else {
        res.status(200).json({ message: "goodbye" });
      }
    });
  } else {
    res.status(200).json({ message: "nevermind" });
  }
});

router.post("/register", (req, res) => {
  let { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 12);

  Users.add({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
