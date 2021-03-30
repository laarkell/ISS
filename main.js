"use strict";
//const fetch = require('node-fetch');

fetch('https://api.wheretheiss.at/v1/satellites/25544')
  .then(res => res.json())
  .then(json => console.log(json))
