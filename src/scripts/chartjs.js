const chartColors = {
    red: 'rgba(255, 99, 132, 1)',
    blue: 'rgba(54, 162, 235, 1)',
    green: 'rgba(75, 192, 192, 1)',
    yellow: 'rgba(255, 205, 86, 1)'
};

const transparentize = (color, opacity) => {
    const [r, g, b] = color.match(/\d+/g).map(Number);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const processLogRecords = (logRecords) => {
    const statusCountByRoute = {};

    logRecords.forEach(record => {
        const route = record.url;
        const status = record.status;

        if (!statusCountByRoute[route]) {
            statusCountByRoute[route] = {};
        }

        statusCountByRoute[route][status] = (statusCountByRoute[route][status] || 0) + 1;
    });

    return statusCountByRoute;
};

const prepareChartData = (statusCountByRoute) => {
    const labels = Object.keys(statusCountByRoute);

    const statuses = Array.from(
        new Set(
            Object.values(statusCountByRoute).flatMap(routeStatuses =>
                Object.keys(routeStatuses)
            )
        )
    );

    const datasets = statuses.map((status, index) => {
        const colors = [chartColors.red, chartColors.blue, chartColors.green, chartColors.yellow];
        return {
            label: `Status ${status}`,
            data: labels.map(route => statusCountByRoute[route][status] || 0),
            borderColor: colors[index % colors.length],
            backgroundColor: transparentize(colors[index % colors.length], 0.5)
        };
    });

    return { labels, datasets };
};

setTimeout(() => {
    if (typeof LOG_RECORDS !== 'undefined' && LOG_RECORDS.length > 0) {
        const statusCountByRoute = processLogRecords(LOG_RECORDS);
        const chartData = prepareChartData(statusCountByRoute);

        const data = {
            labels: chartData.labels,
            datasets: chartData.datasets
        };

        console.log("Chart data:", data);

        const config = {
            type: 'bar',
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
                        text: 'Records per Route',
                        color: 'white'
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            display: true
                        }
                    }
                }
            }
        };

        const ctx = document.getElementById('log-chart')?.getContext('2d');

        if (ctx) {
            const renderChart = () => {
                const myChart = new Chart(ctx, config);
                console.log('Chart rendered with data:', chartData);
            };

            renderChart();
            populate_log_table(LOG_RECORDS);
        } else {
            console.error("Canvas element with id 'log-chart' not found.");
        }
    } else {
        console.error("LOG_RECORDS is undefined or empty.");
    }
}, 5000);
