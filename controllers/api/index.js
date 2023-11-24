const router = require("express").Router();
const user = require("./user");
const todo = require("./todo");
const note = require("./note");

router.use("/users", user);
router.use("/todos", todo);
router.use("/notes", note);

module.exports = router;
