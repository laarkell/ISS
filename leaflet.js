function newplace(lat, lng) {
  var newLat = lat;
  var newLng = lng;
}

fetch('https://api.wheretheiss.at/v1/satellites/25544')
  .then(res => res.json())
  .then(json => {
    console.log(json);
    newplace(json.latitude, json.longitude);
  });


var mymap = L.map('mapid').setView([newLat, newLng], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'laarkell/cknpgf4w40l0o17oywwdkzl8s',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibGFhcmtlbGwiLCJhIjoiY2tucGdlemhsMDAzYTJvcGgwNnM0YzB0cSJ9.8nTcDS-ezFkxkKDkmn5NhA'
}).addTo(mymap);

var terminator = L.terminator().addTo(mymap);

//	L.terminator().addTo(mymap);

var satIcon = L.icon({
  iconUrl: 'sat.svg',
  iconSize: [75, 75],
});


var marker = L.marker([-47, 148], {
  icon: satIcon
}).addTo(mymap);

function updateMarker(lat, lng) {

  var newLatLng = new L.LatLng(lat, lng);
  marker.setLatLng(newLatLng);
}

setInterval(function() {
  terminator.setTime();
  var lng = new Date().getSeconds();
  fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(res => res.json())
    .then(json => {
      console.log(json);
      updateMarker(json.latitude, json.longitude);
    });
}, 1000);
