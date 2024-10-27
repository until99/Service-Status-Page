let PROFILE_OPTIONS_MENU_VISIBLE = false;

function swith_profile_menu() {
  if (PROFILE_OPTIONS_MENU_VISIBLE == false) {
    profile_options_menu.style.visibility = 'hidden';

    setTimeout(() => {
      PROFILE_OPTIONS_MENU_VISIBLE = true;
    }, 100);
  }

  if (PROFILE_OPTIONS_MENU_VISIBLE == true) {
    profile_options_menu.style.visibility = 'visible';

    setTimeout(() => {
      PROFILE_OPTIONS_MENU_VISIBLE = false;
    }, 100);
  }
}

function log_out() {
  localStorage.removeItem("cd_user");
  window.location = 'http://127.0.0.1:5500/pages/auth/login.html'
  console.log(localStorage.getItem("cd_user"));
  
}

swith_profile_menu()

profile_button.addEventListener('click', swith_profile_menu);
manage_routes_menu_button.addEventListener('click', swith_profile_menu);
logout_menu_button.addEventListener('click', log_out);