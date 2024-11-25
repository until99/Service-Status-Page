// const DATA_COUNT = 7;
// const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

// const randomNumbers = (config) =>
//   Array.from({ length: config.count }, () => Math.floor(Math.random() * (config.max - config.min + 1)) + config.min);

// const chartColors = {
//   red: 'rgba(255, 99, 132, 1)',
//   blue: 'rgba(54, 162, 235, 1)'
// };

// const transparentize = (color, opacity) => {
//   const [r, g, b] = color.match(/\d+/g).map(Number);
//   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// };

// const labels = Object.keys(LOG_RECORDS);

// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: 'Records per Route',
//       data: labels.map(route => LOG_RECORDS[route].length),
//       borderColor: chartColors.red,
//       backgroundColor: transparentize(chartColors.red, 0.5),
//     }
//   ]
// };

// const actions = [
//   {
//     name: 'Randomize',
//     handler(chart) {
//       chart.data.datasets.forEach(dataset => {
//         dataset.data = labels.map(route => Math.floor(Math.random() * 100));
//       });
//       chart.update();
//     }
//   }
// ];

// const config = {
//   type: 'line',
//   data: data,
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           color: 'white'
//         }
//       },
//       title: {
//         display: true,
//         text: 'Records per Route',
//         color: 'white'
//       }
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: 'white'
//         }
//       },
//       y: {
//         ticks: {
//           color: 'white'
//         }
//       }
//     }
//   }
// };

// const ctx = document.getElementById('log-chart').getContext('2d');
// const myChart = new Chart(ctx, config);
