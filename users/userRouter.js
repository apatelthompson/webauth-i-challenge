const express = require("express");
const bcrypt = require("bcryptjs");

const restricted = require("../auth/restricted-middleware.js");

const Users = require("./userModel.js");

const router = express.Router();

// router.post("/login", (req, res) => {
//   let { username, password } = req.body;
//
//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         req.session.user = user;
//         res.status(200).json({ message: `Welcome ${user.username}` });
//       } else {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });
//
// router.post("/register", (req, res) => {
//   let { username, password } = req.body;
//
//   const hash = bcrypt.hashSync(password, 12);
//
//   Users.add({ username, password: hash })
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json(error);
//     });
// });

router.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

// router.get("/hash", (req, res) => {
//   const name = req.query.name;
//
//   const hash = bcrypt.hashSync(name, 8);
//   res.send(`the hash for ${name} is ${hash}`);
// });

// function restricted(req, res, next) {
//   const { username, password } = req.headers;
//
//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: "Invalid Credentials" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: "Unexpected error" });
//       });
//   } else {
//     res.status(400).json({ message: "No credentials provided" });
//   }
// }

module.exports = router;
