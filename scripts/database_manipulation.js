async function check_if_user_is_in_database(username, password) {

  try {
    const response = await fetch(`https://hell.pockethost.io/api/collections/users/records?filter=ds_username="${username}"&&ds_password="${password}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.items.length > 0) {

      localStorage.setItem("cd_user", data.items[0].id);

      window.location = 'http://127.0.0.1:5500';

    } else if (data.items.length == 0) {
      window.location = 'http://127.0.0.1:5500/pages/auth/register.html'
    }

  } catch (error) {
    console.error('Error fetching user:', error);
  }

}

async function register_user_in_database(username, password) {

  data = {
    'ds_username': username,
    'ds_password': password
  }

  try {
    const response = await fetch(`https://hell.pockethost.io/api/collections/users/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.statusText);
    }

    console.log(response);

    if (response.ok) {
      window.location = 'http://127.0.0.1:5500/pages/auth/login.html'
    }

  }
  catch (error) {
    console.error('Error fetching user:', error);
  }
}

async function assign_new_url_to_user(user, url) {

  data = {
    'cd_user': user,
    'ds_url': url
  }

  fetch(`https://hell.pockethost.io/api/collections/user_url/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.statusText);
      }
      
      console.log(response.json());

      if (response.ok) {
        window.location = 'http://127.0.0.1:5500/';
      }
    })
    .then(data => {
      console.log("Resposta do servidor:", data);
    })
    .catch(error => {
      console.error("Erro:", error);
    });
}