	var mymap = L.map('mapid').setView([0, 0], 0.5);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	  maxZoom: 18,
	  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
	    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	  id: 'mapbox/streets-v11',
	  tileSize: 512,
	  zoomOffset: -1
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

	function updateMarker(lat,lng){

		var newLatLng = new L.LatLng(lat,lng);
	 	marker.setLatLng(newLatLng);
	};

	setInterval(function(){
		terminator.setTime();
		var lng = new Date().getSeconds();
		fetch('https://api.wheretheiss.at/v1/satellites/25544')
		  .then(res => res.json())
		  .then(json => {
		    console.log(json);
		    updateMarker(json.latitude,json.longitude);
		  })
	},1000);
