async function login(event) {
  event.preventDefault();

  const user = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  if (user.email && user.password) {
    const response = await fetch("/api/users/login", {
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

$("#form-submit").on("click", login);
