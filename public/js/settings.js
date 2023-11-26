function changeSettings(event) {
  event.preventDefault();
  var form = $(this);
  console.log("form", form);
  var url = form.attr("action");
  var data = form.serialize();
  fetch(url, {
    method: "POST",
    body: data,
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        document.location.replace("/settings");
      });
    } else {
      console.log("Response failed");
    }
  });
}

$("#pic-upload").on("submit", changeSettings);
