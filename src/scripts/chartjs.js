// Número de dados
const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

const randomNumbers = (config) =>
  Array.from({ length: config.count }, () => Math.floor(Math.random() * (config.max - config.min + 1)) + config.min);

const chartColors = {
  red: 'rgba(255, 99, 132, 1)',
  blue: 'rgba(54, 162, 235, 1)'
};

const transparentize = (color, opacity) => {
  const [r, g, b] = color.match(/\d+/g).map(Number);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const months = ({ count }) =>
  ["January", "February", "March", "April", "May", "June", "July"].slice(0, count);

const data = {
  labels: months({ count: DATA_COUNT }),
  datasets: [
    {
      label: 'Dataset 1',
      data: randomNumbers(NUMBER_CFG),
      borderColor: chartColors.red,
      backgroundColor: transparentize(chartColors.red, 0.5),
    },
    {
      label: 'Dataset 2',
      data: randomNumbers(NUMBER_CFG),
      borderColor: chartColors.blue,
      backgroundColor: transparentize(chartColors.blue, 0.5),
    }
  ]
};

const actions = [
  {
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = randomNumbers({ count: chart.data.labels.length, min: -100, max: 100 });
      });
      chart.update();
    }
  },
  {
    name: 'Add Dataset',
    handler(chart) {
      const color = chartColors.red;
      const newDataset = {
        label: `Dataset ${chart.data.datasets.length + 1}`,
        data: randomNumbers(NUMBER_CFG),
        borderColor: color,
        backgroundColor: transparentize(color, 0.5),
      };
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  {
    name: 'Remove Dataset',
    handler(chart) {
      chart.data.datasets.pop();
      chart.update();
    }
  }
];

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Custom Chart',
        color: 'white'
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white'
        }
      },
      y: {
        ticks: {
          color: 'white'
        }
      }
    }
  }
};


const ctx = document.getElementById('log-chart').getContext('2d');
const myChart = new Chart(ctx, config);