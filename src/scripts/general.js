// localStorage.setItem('base_route', 'http://127.0.0.1:5500');
localStorage.setItem('base_route', 'http://until99.github.io/service-status-page');

localStorage.setItem('database_base_url', 'https://hell.pockethost.io/api/collections/');

document.addEventListener('DOMContentLoaded', profile_switch());

document.getElementById('home').addEventListener('click', () => {
  window.location.href = localStorage.getItem('base_route');
});

const STATUS_DESCRIPTIONS = {
  '200': "OK",
  '201': "Created",
  '203': "Non-Authoritative Information",
  '204': "No Content",
  '400': "Bad Request",
  '401': "Unauthorized",
  '403': "Forbidden",
  '404': "Not Found",
  '429': "Too Many Requests",
  '500': "Internal Server Error",
  '502': "Bad Gateway",
  '503': "Service Unavailable",
};

(function () {
  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var cors_api_url = 'https://' + cors_api_host + '/';
  var slice = [].slice;
  var origin = window.location.protocol + '//' + window.location.host;
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function () {
    var args = slice.call(arguments);
    var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
    if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== cors_api_host) {
      args[1] = cors_api_url + args[1];
    }
    return open.apply(this, args);
  };
})();