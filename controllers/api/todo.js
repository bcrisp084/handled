const { user, todo } = require("../../models");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { date } = req.body;
    console.log("date-route", date);

    // Convert client-side date string to "YYYY-MM-DD" format
    const [month, day, year] = date.split("/");
    const formattedClientDate = `${year}-${month.padStart(
      2,
      "0"
    )}-${day.padStart(2, "0")}`;

    console.log("formattedClientDate", formattedClientDate);
    console.log(req.session.user_id);
    const todos = await todo.findAll({
      where: {
        due_date: formattedClientDate,
        user_id: req.session.user_id,
      },
      include: [
        {
          model: user,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error in route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { text, due_date, isImportant, isDone } = req.body;
    console.log("text", text);
    console.log("dueDate", due_date);
    console.log("isImportant", isImportant);
    console.log("isDone", isDone);

    const newTodo = await todo.create({
      text,
      due_date,
      isImportant,
      isDone,
      user_id: req.session.user_id,
    });
    res.status(200).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

module.exports = router;
