const express = require("express");
const logger = require("morgan");
const colors = require("colors");

const sql_db = require("./utils/database");
const routes = require("./routes");

const server = express();

server.use(logger("dev"));
server.use(express.json());
server.use("/api/v1/error", routes.postRoute);

server.use((req, res, next) => {
  res.status(400).json({
    message: "Not found",
  });
});

sql_db.run(
  "CREATE TABLE IF NOT EXISTS error (id INTEGER PRIMARY KEY AUTOINCREMENT, content text, uuid text, created_at text)",
  (err) => {
    if (err) console.log(err);
  }
);

const PORT = 5001;

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`.yellow.bold);
});
