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
      localStorage.setItem("ds_cover_image", data.items[0].ds_cover_image);

      window.location = 'http://127.0.0.1:5500';

    } else if (data.items.length == 0) {
      window.location = 'http://127.0.0.1:5500/pages/auth/register.html'
    }

  } catch (error) {
    console.error('Error fetching user:', error);
  }

}

async function register_user_in_database(username, password, cover_image) {

  data = {
    'ds_username': username,
    'ds_password': password,
    'ds_cover_image': cover_image
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

async function create_api_log_report(data) {

  console.log('create_api_log_report');

  data = {
    'cd_user': localStorage.getItem("cd_user"),
    'cd_url': data.cd_url,
    'cd_status': data.cd_status,
    'ds_status': data.ds_status,
    'js_headers': data.js_headers,
  }

  fetch(`https://hell.pockethost.io/api/collections/url_responses/records`, {
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
    })
    .then(
      setTimeout(() => {
        window.location = 'http://127.0.0.1:5500/'
      }, 1000)
    )
    .catch (error => {
    console.error("Erro:", error);
  });

}