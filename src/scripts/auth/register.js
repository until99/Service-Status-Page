document.getElementById('login-button').addEventListener('click', () => {
  window.location.href = localStorage.getItem('base_route') + '/src/pages/auth/login.html';
})

document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  login(email, password);
})

async function login(email, password) {
  const register_data = {
    'email': email,
    'password': password
  }

  try {
    const response = await fetch(localStorage.getItem('database_base_url') + `users/records?filter=email="${email}"&&password="${password}"`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(register_data),
    })

    if (response.ok) {
      console.log(response)
      window.location.href = localStorage.getItem('base_route') + '/src/pages/auth/login.html'
    }
  } catch (error) {
    console.error(error)
  }
}