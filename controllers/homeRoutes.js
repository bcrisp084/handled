const router = require("express").Router();
const { user, todo, note } = require("../models");
const isAuth = require("../config/isAuth");

router.get("/", (req, res) => {
  res.render("landing", {
    logged_in: req.session.logged_in,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/profile", isAuth, async (req, res) => {
  try {
    const todos = await todo.findAll({
      where: {
        user_id: 1,
      },
    });
    const todoData = todos.map((todo) => todo.get({ plain: true }));
    res.render("profile", {
      todoData,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/create", isAuth, async (req, res) => {
  try {
    res.render("create");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/notes", isAuth, async (req, res) => {
  try {
    const notes = await note.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const noteData = notes.map((note) => note.get({ plain: true }));
    res.render("notes", {
      noteData,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/quotes", isAuth, async (req, res) => {
  try {
    res.render("quotes");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/settings", isAuth, async (req, res) => {
  try {
    res.render("settings");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
