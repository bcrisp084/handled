async function signUp(event) {
  event.preventDefault();
  const user = {
    username: $("#username").val(),
    email: $("#email").val(),
    password: $("#password").val(),
  };
  if (user.password !== $("#password2").val()) {
    $("#error-modal").modal("show");
    $("#password").val("");
    $("#password2").val("");
  }
  if (user.username && user.email && user.password) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
}
$("#form-submit").on("click", signUp);
