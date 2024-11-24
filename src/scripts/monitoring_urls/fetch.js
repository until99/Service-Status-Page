async function populate_log_table() {

  const log_records = await fetch_log_records();
  log_records.sort((a, b) => new Date(b.created) - new Date(a.created));

  log_records.forEach(log => {
    document.getElementById('table-body').innerHTML += `
    <tr>
      <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">${log.id}</td>
      <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">${log.cd_url}</td>
      <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">${log.cd_status}</td>
      <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">${log.ds_status}</td>
      <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">${log.created}</td>
    </tr>
    `
  })
}

async function fetch_user_urls() {
  try {
    const response = await fetch(localStorage.getItem('database_base_url') + `apis/records?filter=user_id="${localStorage.getItem('token')}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.items.length > 0) {
      return data.items.map(item => item.url);
    } else {
      return [];
    }

  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
}

async function make_request() {
  const urls = await fetch_user_urls();
  const api_responses = await fetch_url_list(urls);
  generate_log_records(api_responses);
}

document.getElementById('make-request').addEventListener('click', async () => {
  make_request();
});

async function fetch_url_list(urls) {
  let api_responses = [];

  await Promise.all(
    urls.map(async (url) => {
      let headers = [];

      try {
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);

        response.headers.forEach((value, name) => {
          headers.push({ name: name, value: value });
        });

        api_responses.push({
          'user_id': localStorage.getItem('token'),
          'url': url,
          'status': response.status,
          'checked_at': new Date().toISOString(),
          'status_description': STATUS_DESCRIPTIONS[response.status] || "Unknown Status",
        });
      } catch (error) {
        api_responses.push({
          'user_id': localStorage.getItem('token'),
          'url': url,
          'status': 'Error',
          'status_description': error.message,
        });
      }
    })
  );

  return api_responses;
}

async function fetch_log_records() {
  try {
    const response = await fetch(localStorage.getItem('database_base_url') + `apis_history/records?filter=user_id="${localStorage.getItem('token')}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.items.length > 0) {
      return data.items;
    } else {
      return [];
    }

  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
}

async function generate_log_records(api_responses) {
  api_responses.forEach((api_response) => {
    try {
      const response = fetch(localStorage.getItem('database_base_url') + 'apis_history/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(api_response),
      });

    } catch (error) {
      console.error('Error sending log record:', error);
    }
  });

  populate_log_table();
}

document.addEventListener('DOMContentLoaded', () => {
  make_request()
});