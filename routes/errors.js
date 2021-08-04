const express = require("express");

const {
  fetchAllErrors,
  addError
} = require("../controllers/errors");

const router = express.Router();

router.route("/").get(fetchAllErrors).post(addError);
// router.route("/:id").delete(deletePostById).put(editPostById);

module.exports = router;
