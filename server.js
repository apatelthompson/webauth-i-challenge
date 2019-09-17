const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const userRouter = require("./users/userRouter.js");
const authRouter = require("./auth/auth-router.js");
const dbConnection = require("./data/dbConfig.js");
const server = express();

const sessionConfig = {
  name: "llama",
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 30,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "knexsessions",
    sidfieldname: "sessionid",
    createtable: true,
    clearInterval: 1000 * 60 * 30
  })
};

server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/", userRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.status(200).send(`<h2>It's Working!</h2>`);
});

module.exports = server;
