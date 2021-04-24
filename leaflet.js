"use strict";

// 0. create global vars
var mymap, terminator,
	satIcon, marker, timer;

// 1. fetch iss data

function getData() {
	fetch('https://api.wheretheiss.at/v1/satellites/25544')
		.then(res => res.json())
		.then(json => {
			// after data has been received
			console.log(json);
			// on the first run create the map
			if (!mymap) {
				createMap(json.latitude, json.longitude);
			}
			// if map already created then update marker position
			else {
				updateMarker(json.latitude, json.longitude);
			}
		});
}
// gets data when the page loads
getData();


// 2. create map

function createMap(lat, lng) {

	// create Leaflet map, store reference in global var
	mymap = L.map('mapid').setView([lat, lng], 3);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'laarkell/cknpgf4w40l0o17oywwdkzl8s',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibGFhcmtlbGwiLCJhIjoiY2tucGdlemhsMDAzYTJvcGgwNnM0YzB0cSJ9.8nTcDS-ezFkxkKDkmn5NhA'
	}).addTo(mymap);

	terminator = L.terminator().addTo(mymap);

	//	L.terminator().addTo(mymap);

	// create icon, storing ref in global var
	satIcon = L.icon({
		iconUrl: 'sat.svg',
		iconSize: [90, 90],
	});

	// create marker, storing ref in global var
	marker = L.marker([lat, lng], {
		icon: satIcon
	}).addTo(mymap);

	// start timer, storing ref in global var
	timer = setInterval(function() {
		terminator.setTime();
		// var lng = new Date().getSeconds();
		getData();
	}, 1000);
}

// called every time new data received

function updateMarker(lat, lng) {
	var newLatLng = new L.LatLng(lat, lng);
	marker.setLatLng(newLatLng);
}
