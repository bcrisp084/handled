$(document).ready(function () {
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


});
