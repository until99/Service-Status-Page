// const pb = new PocketBase('https://hell.pockethost.io');

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

var CURRENT_PAGE = 0;
const PER_PAGE = 25;

function addPagination() {
  CURRENT_PAGE += 1;
}

function subPagination() {
  CURRENT_PAGE -= 1;
}

function getAtualPage() {
  return CURRENT_PAGE;
}

function getTotalPages() {
  return RECORDS.totalPages;
}

async function getPaginatedRecordList() {
  const url = `https://hell.pockethost.io/api/collections/MONITORING/records?page=${CURRENT_PAGE}&perPage=${PER_PAGE}`;

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
    loadDataIntoTable(records)

    loadDataIntoTable(RECORDS);
  } catch (error) {
    console.error("Error fetching records:", error.message);
  }
}

function loadDataIntoTable(records) {
  const logTable = document.getElementById("logTable");
  const tbody = logTable.querySelector('tbody');
  tbody.innerHTML = '';
  
  records.items.forEach(item => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = item.id;
    row.appendChild(idCell);

    const pagenameCell = document.createElement("td");
    pagenameCell.textContent = item.DS_PAGENAME;
    row.appendChild(pagenameCell);

    const datetimeCell = document.createElement("td");
    datetimeCell.textContent = formatDate(item.DT_DATETIME);
    row.appendChild(datetimeCell);

    const pageupCell = document.createElement("td");
    pageupCell.textContent = item.FG_UP ? 'True' : 'False';
    row.appendChild(pageupCell);

    const errorMessageCell = document.createElement("td");
    errorMessageCell.textContent = item.DS_ERROR || 'No error';
    row.appendChild(errorMessageCell);

    tbody.appendChild(row);
  })
}

// Chame a função para garantir que ela funcione no HTML
if (typeof window !== 'undefined') {
  getPaginatedRecordList();
}

// Exportar a função apenas se o módulo for importado
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadDataIntoTable, getPaginatedRecordList };
}
