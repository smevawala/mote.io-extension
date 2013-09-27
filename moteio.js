//var remote_location = "https://localhost:3000";
//var remote_location = 'https://moteiostaging-9163.onmodulus.net';
var remote_location = 'https://mote.io:443';

var date = new Date();

var extension_url = remote_location + "/js/plugin.js?_=" + date.getTime();

window.exec = function(fn) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')();';
  document.documentElement.appendChild(script);
  document.documentElement.removeChild(script);
}

function async_load(){

  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = extension_url;
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);

}

if (window.attachEvent) {
  window.attachEvent('onload', async_load);
} else {
  window.addEventListener('load', async_load, false);
}

exec(function(){
	window.mote = {io: {}};
});
