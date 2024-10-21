// logChart.js
// Exportar a função apenas se o módulo for importado

let Chart;
if (typeof module !== 'undefined' && module.exports) {
  // Running in the browser, Chart.js should be loaded from the CDN
  Chart = require('chart.js/auto');
} else {
  // Running in a test environment, import Chart.js as a module
  Chart = window.Chart;
}

let chartInstance;

function initializeChart() {
  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const errorCounts = [5, 8, 2, 6, 3, 9, 4, 1, 7, 0, 10, 4];

  const ctx = document.getElementById('logChart');

  const data = {
    labels: labels,
    datasets: [{
      label: 'Erros por mês',
      data: errorCounts,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
          text: 'Contagem de Erros por Mês'
        }
      }
    },
  };

  chartInstance = new Chart(ctx, config);
}

// Chame a função para garantir que ela funcione no HTML
if (typeof window !== 'undefined') {
  initializeChart();
}

// Exportar a função apenas se o módulo for importado
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initializeChart, chartInstance};
}
