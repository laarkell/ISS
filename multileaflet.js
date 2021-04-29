"use strict";



// // 0. create global vars
// var mymap2, terminator,
//   satIcon, marker, timer, i;
//
// // 1. fetch iss data
//
// function getData() {
   fetch('https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/90/ANY/&apiKey=XFR4Y5-ULWYWF-H64T3J-4OKO')
     .then(res => res.json())
     .then(json => {
       // after data has been received
       console.log(json);
			 for (i = 0; i < json.satcount; i++) {
			            console.log(json.satlat, json.satlng);
			 }
		 });
//       if (!mymap2) {
//         createMap();
//       }
//       // if map already created then update marker position
//       else {
//         for (i = 0; i < json.satcount; i++) {
//           updateMarker(json.satlat, json.satlng);
//         }
//       }
//     });
// }
// // gets data when the page loads
// getData();
//
//
// // 2. create map
// function createMap() {
//   // create Leaflet map, store reference in global var
//   mymap2 = L.map('map2').setView([41.702, -76.014], 3);
//
//   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'laarkell/cknpgf4w40l0o17oywwdkzl8s',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoibGFhcmtlbGwiLCJhIjoiY2tucGdlemhsMDAzYTJvcGgwNnM0YzB0cSJ9.8nTcDS-ezFkxkKDkmn5NhA'
//   }).addTo(mymap2);
//
//   terminator = L.terminator().addTo(mymap2);
//
//   // create icon, storing ref in global var
//   satIcon = L.icon({
//     iconUrl: 'sat.svg',
//     iconSize: [100, 100],
//   });
//
//   // create marker, storing ref in global var
//   marker = L.marker([lat, lng], {
//     icon: satIcon
//   }).addTo(mymap2);
//
//   // start timer, storing ref in global var
//   timer = setInterval(function() {
//     terminator.setTime();
//     // var lng = new Date().getSeconds();
//     getData();
//   }, 1000);
// }
//
// // called every time new data received
//
// function updateMarker(lat, lng) {
//   var newLatLng = new L.LatLng(lat, lng);
//   marker.setLatLng(newLatLng);
// }
