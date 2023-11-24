const User = require("../../models/User");

const router = require("express").Router();

router.post("/", async (req, res) => {
  console.log("req.body", req.body);
  try {
    const user = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }
    const validPassword = await user.passwordValidate(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json({ user, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).json({ message: "You are now logged out!" });
    });
  } else {
    res.status(404).json({ message: "You are not logged in!" });
  }
});

module.exports = router;
