user_register_form = document.getElementById("user-register-form");

user_register_form.addEventListener("submit", (e) => {
  e.preventDefault();

  register_user_in_database(document.getElementById("user-register-input").value, document.getElementById("password-register-input").value, document.getElementById("profile-image-register-input").value);

  document.getElementById("user-register-input").value = '';
  document.getElementById("password-register-input").value = ''
  document.getElementById("profile-image-register-input").value = ''

}); 