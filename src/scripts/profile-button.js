document.getElementById('profile-button').addEventListener('click', () => {
  document.getElementById('profile-options-menu').classList.toggle('hidden');
})

function logout() {
  localStorage.setItem('token', null);
  window.location.href = localStorage.getItem('base_route');
}

function profile_switch() {
  document.getElementById('profile-options-menu').classList.toggle('hidden');
}

document.getElementById('logout-menu-button').addEventListener('click', () => {
  logout();
})

document.getElementById('home-menu-item').addEventListener('click', () => {
  window.location.href = localStorage.getItem('base_route');
})

document.getElementById('routes-menu-item').addEventListener('click', () => {
  window.location.href = localStorage.getItem('base_route') + '/src/pages/routes.html';
})