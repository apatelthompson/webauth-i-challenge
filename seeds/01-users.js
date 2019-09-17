exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Joe Smith", password: "hello" },
        { username: "Mary Luoa", password: "guest" },
        { username: "Stella Luna", password: "tree" }
      ]);
    });
};
