const { user, note } = require("../../models");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    console.log("text", text);
    console.log(req.session.user_id);
    const createNote = await note.create({
      text,
      user_id: req.session.user_id,
    });
    res.status(200).json(createNote);
  } catch (err) {
    console.error("Error in route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
