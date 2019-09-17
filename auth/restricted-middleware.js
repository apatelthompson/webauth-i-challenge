const bcrypt = require("bcryptjs");

const Users = require("../users/userModel.js");

module.exports = (req, res, next) => {
  let { username, password } = req.headers;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: "Invalid credentials!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};
