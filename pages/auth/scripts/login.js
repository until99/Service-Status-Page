user_login_form = document.getElementById("user-login-form");

user_login_form.addEventListener("submit", (e) => {
  e.preventDefault();

  check_if_user_is_in_database(document.getElementById("user-input").value, document.getElementById("password-input").value);

  document.getElementById("user-input").value = '';
  document.getElementById("password-input").value = ''

})