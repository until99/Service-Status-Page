document.getElementById('add-route-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const url = document.getElementById('url').value;

  create_route(url);

  document.getElementById('add-route-form').reset();
})

async function create_route(url) {
  let data = {
    'cd_user': localStorage.getItem('token'),
    'ds_url': url.trim()
  }

  try {
    const response = await fetch(localStorage.getItem('database_base_url') + `user_url/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      window.location.href = localStorage.getItem('base_route') + '/src/pages/routes.html'
    };

  } catch (error) {
    console.error(error)
  }
}

async function get_routes() {
  try {
    const response = await fetch(localStorage.getItem('database_base_url') + `user_url/records?filter=cd_user="${localStorage.getItem('token')}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const routes = await response.json();

      populate_routes_table(routes);
    }

  } catch (error) {
    console.error(error)
  }
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function populate_routes_table(routes) {

  // <button class="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded w-fit"
  //   id="edit-${escapeHtml(route.id)}"
  //   onclick="edit_route('${escapeHtml(route.id)}', 'url-${escapeHtml(route.id)}')">
  //   Editar
  // </button>

  document.getElementById('table-body').innerHTML = '';

  routes.items.forEach(route => {
    document.getElementById('table-body').innerHTML += `
      <tr>
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
          ${escapeHtml(route.id)}
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
          <input class="text-sm bg-transparent text-white focus:outline-none" type="url" id="url-${escapeHtml(route.id)}" value="${escapeHtml(route.ds_url)}" />
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
          ${escapeHtml(route.created)}
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
          <button class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-fit"
            id="delete-${escapeHtml(route.id)}"
            onclick="delete_route('${escapeHtml(route.id)}')">
            Deletar
          </button>
        </td>
      </tr>
    `;
  });
}

async function delete_route(id) {
  try {
    const response = await fetch(localStorage.getItem('database_base_url') + `user_url/records/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (await response != undefined) {
      window.location.href = localStorage.getItem('base_route') + '/src/pages/routes.html'
    }

  }

  catch (error) {
    console.error(error)
  }
}

// async function edit_route(id, input_id_url) {
//   let data = {
//     'cd_user': localStorage.getItem('token'),
//     'ds_url': document.getElementById(input_id_url).value
//   };

//   try {
//     const response = await fetch(url, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorMessage = await response.text();
//       console.error(`Error: ${response.status} - ${errorMessage}`);
//       return;
//     }

//     const result = await response.json();
//     console.log('Requisição bem-sucedida', result);

//   } catch (error) {
//     console.error('Erro na requisição:', error);
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
  get_routes();
})