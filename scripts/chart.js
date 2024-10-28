async function request_chart_data() {
  try {
    const response = await fetch(`https://hell.pockethost.io/api/collections/url_responses/records?records?filter=cd_user="${localStorage.getItem("cd_user")}"`, {
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
      initializeChart(data)
    }

  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

function sumErrorDateCount(log_data) {

  const counts = {};

  log_data.items.forEach(item => {
    const date = new Date(item.created).toISOString().split('T')[0];

    if (item.cd_status == 200) {
      counts[date] = (counts[date] || 0) + 1;
    }

  });

  return counts;

}

function initializeChart(log_data) {

  log_count = sumErrorDateCount(log_data)

  const labels = Object.keys(log_count);;
  const errorCounts = Object.values(log_count);

  const ctx = document.getElementById('log-chart');

  const data = {
    labels: labels,
    datasets: [{
      label: 'Erros por Data',
      data: errorCounts,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
      tension: 0.1
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Contagem de Erros por Data'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Data'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Quantidade de Erros'
          }
        }
      }
    },
  };

  chartInstance = new Chart(ctx, config);
}

document.addEventListener('DOMContentLoaded', request_chart_data())