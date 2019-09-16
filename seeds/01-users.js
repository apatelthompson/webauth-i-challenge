exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Joe Smith", password: "123$%^" },
        { username: "Mary Luoa", password: "*&%323" },
        { username: "Stella Luna", password: ")#&$224" }
      ]);
    });
};
