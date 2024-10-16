const pb = new PocketBase('https://hell.pockethost.io');

function formatDate(datetimeString) {
  const date = new Date(datetimeString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

let currentPage = 0;
const perPage = 10;

async function getFullRecordList(step) {
  if (step === 'next') {
    currentPage += 1;
  } else if (step === 'previus') {
    if (currentPage > 0) {
      currentPage -= 1; 
    }
  }

  const url = `https://hell.pockethost.io/api/collections/MONITORING/records?page=${currentPage}&perPage=${perPage}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const records = await response.json();
    // console.log(records);

    const logTable = document.getElementById("logTable");
    const tbody = logTable.querySelector('tbody');
    tbody.innerHTML = ''; 

    records.items.forEach(record => {
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.textContent = record.id;
      row.appendChild(idCell);

      const pagenameCell = document.createElement("td");
      pagenameCell.textContent = record.DS_PAGENAME;
      row.appendChild(pagenameCell);

      const datetimeCell = document.createElement("td");
      datetimeCell.textContent = formatDate(record.DT_DATETIME);
      row.appendChild(datetimeCell);

      const pageupCell = document.createElement("td");
      pageupCell.textContent = record.FG_UP ? 'True' : 'False';
      row.appendChild(pageupCell);

      const errorMessageCell = document.createElement("td");
      errorMessageCell.textContent = record.DS_ERROR || 'No error';
      row.appendChild(errorMessageCell);

      tbody.appendChild(row);
    });

  } catch (error) {
    console.error("Error fetching records:", error.message);
  }
}

getFullRecordList('next');
