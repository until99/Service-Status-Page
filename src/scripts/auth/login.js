document.getElementById('signup-button').addEventListener('click', () => {
  window.location.href = localStorage.getItem('base_route') + '/src/pages/auth/register.html';
})

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  login(email, password);
})

function login(email, password) {
  fetch(localStorage.getItem('database_base_url') + `users/records?filter=email="${email}"&&password="${password}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {

      if (data.items.length > 0) {

        localStorage.setItem('token', data.items[0].id);
        window.location.href = localStorage.getItem('base_route');

      } else {
        window.location.href = localStorage.getItem('base_route') + '/src/pages/auth/register.html';
      }
    })
    .catch(error => console.error(error));
}