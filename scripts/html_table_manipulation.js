async function request_log_table_data() {
  try {
    const currentPage = localStorage.getItem('current_page') || 1;
    const response = await fetch(`https://hell.pockethost.io/api/collections/url_responses/records?records?page=${currentPage}&perPage=${PER_PAGE}&filter=cd_user="${localStorage.getItem("cd_user")}"`, {
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
      create_log_table(data);
      updatePagination(data);
    } else {
      document.getElementById("log-table").innerHTML = "<tr><td colspan='5'>No data found.</td></tr>";
    }

  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

function create_log_table(data) {
  const tbody = document.getElementById("log-table");
  tbody.innerHTML = '';

  data.items.forEach((item) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.className = "whitespace-nowrap px-4 py-2 font-medium";
    idCell.textContent = item.id;
    row.appendChild(idCell);

    const apiUrlCell = document.createElement("td");
    apiUrlCell.className = "whitespace-nowrap px-4 py-2";
    apiUrlCell.textContent = item.cd_status;
    row.appendChild(apiUrlCell);

    const apiStatusCell = document.createElement("td");
    apiStatusCell.className = "whitespace-nowrap px-4 py-2";
    apiStatusCell.textContent = item.ds_status;
    row.appendChild(apiStatusCell);

    const datetimeCell = document.createElement("td");
    datetimeCell.className = "whitespace-nowrap px-4 py-2";
    datetimeCell.textContent = item.created;
    row.appendChild(datetimeCell);

    const apiiHeaderCell = document.createElement("td");
    apiiHeaderCell.className = "whitespace-nowrap px-4 py-2";
    apiiHeaderCell.textContent = item.errorMessage || 'N/A';
    row.appendChild(apiiHeaderCell);

    const detailsCell = document.createElement("td");
    detailsCell.className = "whitespace-nowrap px-4 py-2";
    const detailsLink = document.createElement("a");
    detailsLink.href = `${item.id}`;
    detailsLink.className =
      "inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700";
    detailsLink.textContent = "Details";
    detailsCell.appendChild(detailsLink);
    row.appendChild(detailsCell);

    tbody.appendChild(row);
  });
}

function updatePagination(data) {
  const actual_page_count_html = document.getElementById('actual-page');
  const currentPage = parseInt(localStorage.getItem('current_page')) || 1;

  actual_page_count_html.innerHTML = `${currentPage}`;

  document.getElementById('next-page-button').disabled = !data.totalPages;
  document.getElementById('previous-page-button').disabled = currentPage <= 1;
}

document.getElementById('next-page-button').addEventListener('click', () => {
  const cur = getCurrentPage();
  localStorage.setItem('current_page', cur + 1); // Increment the page
  request_log_table_data(); // Fetch the new data
});

document.getElementById('previous-page-button').addEventListener('click', () => {
  const cur = getCurrentPage();
  if (cur > 1) { // Ensure we don't go below page 1
    localStorage.setItem('current_page', cur - 1); // Decrement the page
    request_log_table_data(); // Fetch the new data
  }
});

ocument.addEventListener("DOMContentLoaded", () => {
  // Check if current_page is in localStorage, if not set it to 1
  if (!localStorage.getItem('current_page')) {
    localStorage.setItem('current_page', 1);
  } else {
    // Optionally, log the current page for debugging
    console.log('Current page:', localStorage.getItem('current_page'));
  }

  request_log_table_data(); // Fetch data when the DOM is loaded
});

function getCurrentPage() {
  return parseInt(localStorage.getItem('current_page'), 10);
}
