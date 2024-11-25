document.getElementById('add-route-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const url_nickname = document.getElementById('group').value;
  const url = document.getElementById('url').value;

  create_route(url_nickname, url);

  document.getElementById('add-route-form').reset();
})

async function create_route(name, url) {
  let data = {
    'name': name.trim(),
    'user_id': localStorage.getItem('token'),
    'url': url.trim()
  }

  try {
    const response = await fetch(localStorage.getItem('database_base_url') + `apis/records`, {
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
    const response = await fetch(localStorage.getItem('database_base_url') + `apis/records?filter=user_id="${localStorage.getItem('token')}"`, {
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

  document.getElementById('table-body').innerHTML = '';

  routes.items.forEach(route => {
    route.created = new Date(route.created).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });

  routes.items.forEach(route => {
    document.getElementById('table-body').innerHTML += `
      <tr>
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
          ${escapeHtml(route.id)}
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
          <input class="text-sm bg-transparent text-white focus:outline-none" type="text" id="nickname-${escapeHtml(route.name)}" value="${escapeHtml(route.name)}" />
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
          <input class="text-sm bg-transparent text-white focus:outline-none" type="url" id="url-${escapeHtml(route.id)}" value="${escapeHtml(route.url)}" />
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
          ${escapeHtml(route.created)}
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
          <button class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-fit"
            id="delete-${escapeHtml(route.id)}"
            onclick="delete_route('${escapeHtml(route.id)}', '${route.url}')">
            Deletar
          </button>
        </td>
      </tr>
    `;
  });
}

async function delete_route(id) {
  try {
    const response = await fetch(localStorage.getItem('database_base_url') + `apis/records/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      window.location.reload();
    }
  }
  catch (error) {
    console.error(error)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  get_routes();
})