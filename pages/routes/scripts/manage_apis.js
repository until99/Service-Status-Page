route_register_form = document.getElementById("route-register-form");

route_register_form.addEventListener("submit", (e) => {
  e.preventDefault();

  assign_new_url_to_user(localStorage.getItem("cd_user"), document.getElementById("route-input").value);

  document.getElementById("route-input").value = '';

})