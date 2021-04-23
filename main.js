"use strict";
//const fetch = require('node-fetch');

fetch('https://api.wheretheiss.at/v1/satellites/25544')
  .then(res => res.json())
  .then(json => {
    console.log(json)
    updateMarker(json.latitude,json.longitude)
  });

function changetab1(){
  $(".facts").load("facts.html")
}
function changetab2(){
  $(".howto").load("howto.html")
}
function changetab3(){
  $(".help").load("help.html")
}

$(document).on("click", '.howtotab', function() {
  changetab2();
});
$(document).on("click", '.factstab', function() {
  changetab1();
});
$(document).on("click", '.helptab', function() {
  changetab3();
});
