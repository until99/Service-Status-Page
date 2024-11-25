routes_filter_select = document.getElementById('routes_filter')


document.addEventListener('DOMContentLoaded', () => {
    populate_routes_filter_select();
});

function populate_routes_filter_select() {
    api_response = fetch_user_urls();

    api_response.then((routes) => {
        routes.forEach((route) => {
            routes_filter_select.innerHTML += `<option value="${route}">${route}</option>`;
        });
    });
}

function filter_records_by_route(route) {

    if (route === 'all') {
        populate_log_table(LOG_RECORDS);
        return;
    }

    filtered_records = LOG_RECORDS.filter((record) => record.url === route);
    document.getElementById('table-body').innerHTML = '';
    populate_log_table(filtered_records);
}

routes_filter_select.addEventListener('change', (e) => {
    filter_records_by_route(e.target.value);
});