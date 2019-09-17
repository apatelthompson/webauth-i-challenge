const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  add
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
