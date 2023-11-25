$(document).ready(function () {
  const apiKey = "52e588af39mshe9a5dded89cbdb2p1b926ejsn5f5cb8841a8f";
  setInterval(function () {
    $(".datetime").text(dayjs().format("MMMM D, YYYY h:mm A"));
  }, 1000);
  $(function () {
    $("#datepicker").datepicker();
  });

  $("#datepicker").on("change", function () {
    let date = $(this).val();
    console.log("date", date);
    // $("#date").text(date);
  });

  $("#date-search").on("click", function () {
    let date = $("#datepicker").val();
    console.log("date-this", date);
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        $("#todo-list").empty();
        for (let i = 0; i < data.length; i++) {
          const todo = data[i];
          const newTodo = $(`<li class="list-group-item">${todo.text}</li>`);
          $("#todo-list").append(newTodo);
        }
      });
  });

  function getQuote() {
    fetch(
      `https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?rapidapi-key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        $("#quote").text(data.text);
        $("#author").text(data.author);
        $("#category").text(data.category);
      });
  }
  getQuote();

  function getRandomQuote() {
    fetch(
      `https://famous-quotes4.p.rapidapi.com/random?category=all&count=2&rapidapi-key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        $("#random-quote").text(data[0].text);
        $("#random-author").text(data[0].author);
        $("#random-category").text(data[0].category);
      });
  }

  $("#random-quote-btn").on("click", getRandomQuote);

  function submitTask(event) {
    event.preventDefault();
    let text = $("#text").val();
    let due_date = $("#dueDate").val();
    let isImportant = $("#importance").is(":checked");
    let isDone = $("#done").is(":checked");
    console.log("text", text);
    console.log("due_date", due_date);
    console.log("isImportant", isImportant);
    console.log("isDone", isDone);
    fetch("/api/todos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, due_date, isImportant, isDone }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        $("#text").val("");
        $("#dueDate").val("");
        $("#importance").prop("checked", false);
        $("#done").prop("checked", false);
      });
  }

  $("#create-submit").on("click", submitTask);

  function submitNote() {
    let text = $("#note").val();
    console.log("text", text);
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        $("#note").val("");
        window.location.reload();
      });
  }

  $("#add-note").on("click", submitNote);

  function getNotes() {
    fetch("/notes")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        $("#notes-list").empty();
        for (let i = 0; i < data.length; i++) {
          const note = data[i];
          const newNote = $(`<li class="list-group-item">${note.text}</li>`);
          $("#notes").append(newNote);
        }
      });
  }
  getNotes();
});
