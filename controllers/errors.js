const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");

const db = require("../utils/database");

const fetchAllErrors = (req, res, next) => {
  db.all("SELECT * FROM error ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Unable to get post" });
    }
    return res.status(200).json({ errors: rows });
  });
};
//
const addError = (req, res, next) => {
  let { content } = req.body;
  let id = uuidv4();

  let created_at = dayjs().format("YYYY-MM-DD hh:mm:ss");

  let stmt = "INSERT INTO error (uuid, content, created_at) VALUES (?,?, ?)";
  let params = [id, content, created_at];
  db.run(stmt, params, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
  }).get(`SELECT * FROM error WHERE uuid = '${id}'`, (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json({
      message: "success",
      error: row,
    });
  });
};

module.exports = {
  addError,
  fetchAllErrors,
};
