async function make_some_stuff(urls) {
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
          cd_url: url,
          cd_status: response.status,
          ds_status: STATUS_DESCRIPTIONS[response.status] || "Unknown Status",
          js_headers: headers
        });
      } catch (error) {
        api_responses.push({
          cd_url: url,
          cd_status: 'Error',
          ds_status: error.message,
          js_headers: []
        });
      }
    })
  );

  api_responses.forEach(ld => {
    create_api_log_report(ld);
  });
}


async function get_api_data_from_user_urls() {

  try {
    const response = await fetch(`https://hell.pockethost.io/api/collections/user_url/records?filter=cd_user="${localStorage.getItem('cd_user')}"`, {
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

      let urls = [];

      data.items.forEach(item => {
        urls.push(item.ds_url);
      });

      make_some_stuff(urls);

    }

  } catch (error) {
    console.error('Error fetching user:', error);
  }

}

let ondemand_api_call_button = document.getElementById('ondemand-call-apis-button');
ondemand_api_call_button.addEventListener('click', () => get_api_data_from_user_urls());