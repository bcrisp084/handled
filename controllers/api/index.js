const router = require("express").Router();
const user = require("./user");
const todo = require("./todo");
const note = require("./note");
const settings = require("./settings");

router.use("/users", user);
router.use("/todos", todo);
router.use("/notes", note);
router.use("/settings", settings);

module.exports = router;
