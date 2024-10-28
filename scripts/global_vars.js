let profile_options_menu = document.getElementById("profile-options-menu");
let profile_button = document.getElementById("profile-button");
let manage_routes_menu_button = document.getElementById("manage-routes");
let logout_menu_button = document.getElementById("logout-menu-button");

var PER_PAGE = 5;

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

const profile_icon = document.getElementById('profile-icon');
const coverImage = localStorage.getItem("ds_cover_image");

if (coverImage) {
  profile_icon.src = coverImage;
} else {
  console.warn("No cover image found in localStorage.");
}