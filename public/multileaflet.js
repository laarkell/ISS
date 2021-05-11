"use strict";

// 0. create global vars
var mymap2, terminator,
  satIcon, marker, timer, i, row, markerObj = {},
  dataObj = {};

// var url = 'http://localhost:3000/hello';
// if (!window.location.href.includes('localhost')){
//   url = 'https://issapp878.herokuapp.com/hello';
// }
// 1. fetch iss data

function getData() {
  fetch('/proxy/satellites')
  .then(d => d.text())
	.then(d => {
    dataObj = {};
    for (var i = 0; i < d.info.satcount; i++) {
      if (i > 100) {
        break;
      }
      dataObj[d.above[i].intDesignator] = d.above[i];
    }

    if (!mymap2) {
      createMap();
    } else {
      updateMarkers();
    }
  })
	.catch(err => console.error("fetch #2", err));

  // .then((res) => {
  //
  //   // var resJson = JSON.parse(res);
  //   var resJson = res.json();
  //   console.log(resJson);
  //   return resJson;
  //
  // })
  //
  // .then((resJson) => {
  //
  //   dataObj = {};
  //   for (var i = 0; i < resJson.info.satcount; i++) {
  //     if (i > 100) {
  //       break;
  //     }
  //     dataObj[resJson.above[i].intDesignator] = resJson.above[i];
  //   }
  //
  //   if (!mymap2) {
  //     createMap();
  //   } else {
  //     updateMarkers();
  //   }
  // }).catch((err) => {
  //   console.log("error");
  // });
}

// function getData() {
//   fetch('multisat.json')
//     .then(response => response.json())
//     .then(data => {
//       dataObj = {};
//       for (var i = 0; i < data.info.satcount; i++) {
// 				if (i > 100){
// 					break;
// 				}
//         dataObj[data.above[i].intDesignator] = data.above[i];
//       }
//
//       if (!mymap2) {
//         createMap();
//       } else {
//         updateMarkers();
//       }
//     });
// }
// // gets data when the page loads
//
getData();

// 2. create map
function createMap() {
  console.log("Create Map");
  // create Leaflet map, store reference in global var
  mymap2 = L.map('mapid').setView([41.702, -76.014], 4);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'laarkell/cknpgf4w40l0o17oywwdkzl8s',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGFhcmtlbGwiLCJhIjoiY2tucGdlemhsMDAzYTJvcGgwNnM0YzB0cSJ9.8nTcDS-ezFkxkKDkmn5NhA'
  }).addTo(mymap2);

  terminator = L.terminator().addTo(mymap2);

  // create icon, storing ref in global var
  satIcon = L.icon({
    iconUrl: 'sat.svg',
    iconSize: [100, 100],
  });

  //    for (var i = 0; i < row.length; i++) {
  //     	marker = L.marker([row.satlat(i), row.satlng(i)], {
  //     		icon: satIcon
  //         }).addTo(mymap2);
  // }

  for (var key in dataObj) {
    // console.log(dataObj[key]);
    markerObj[key] = L.marker([dataObj[key].satlat, dataObj[key].satlng], {
      icon: satIcon
    }).addTo(mymap2);
  }


  //   // create marker, storing ref in global var
  //   marker = L.marker([41.702, -76.014], {
  //     icon: satIcon
  //   }).addTo(mymap2);


}
// End create Map

//   // start timer, storing ref in global var
timer = setInterval(function() {
  // terminator.setTime();
  // var lng = new Date().getSeconds();
  getData();
  console.log("Timer Called");
}, 5000);

// called every time new data received

function updateMarkers() {
  console.log("Update Markers");
  for (var key in markerObj) {
    if (dataObj[key]) {
      // var newLatLng = new L.LatLng(dataObj[key].satlat, dataObj[key].satlng);
      var newLatLng = new L.LatLng(dataObj[key].satlat, dataObj[key].satlng);
      markerObj[key].setLatLng(newLatLng);
    } else {
      delete markerObj[key];
    }
  }
}
