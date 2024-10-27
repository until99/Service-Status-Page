// caso estejam estourando erros no terminal, entre no seguinte site e solicite permissão temporária pra versão demo: https://cors-anywhere.herokuapp.com/corsdemo
async function check_apis_status() {
  // let urls = [
  //   'https://www.amazon.com/',
  //   'https://github.com/',
  //   'https://http.cat/',
  //   'https://google.com/'
  // ];

  const responses = await Promise.all(
    urls.map(async (url) => {
      let headers = [];

      try {
        const response = await fetch(`https://corsproxy.io/?${url}`);

        // Coleta de cabeçalhos
        response.headers.forEach((value, name) => {
          headers.push({ name: name, value: value });
        });

        return {
          url: url,
          status: response.status,
          statusText: statusDescriptions[response.status] || "Unknown Status",
          headers: headers
        };
      } catch (error) {
        return {
          url: url,
          status: 'Error',
          statusText: error.message,
          headers: []
        };
      }
    })
  );

  console.log(responses);
  // insert_data_into(responses);

}