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
