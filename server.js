"use strict";

const express = require('express');
const Fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/hello', (req, res) => {
  Fetch('https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/90/ANY/&apiKey=XFR4Y5-ULWYWF-H64T3J-4OKO'
).then(res => res.text())
  .then(text => {
    var json = JSON.parse(text);
    console.log(json);
    res.json(json);
  });
// .then((data) => {
//
//       console.log(data.text());
//       var resJson = JSON.parse(data.text());
//       console.log(resJson);
//       res.json(resJson);
//
//     }).catch((err) => {
//       console.log("error", err);
//       res.json("error");
//     });
     // res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
