"use strict";

const express = require('express');
const nodeFetch = require('node-fetch');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

// test route
app.get('/hello', (req, res) => {
	res.send("Hello world!");
});

const endpoints = {
	test: {
		url: 'https://owenmundy.com',
		type: 'text'
	},
	catfact: {
		url: 'https://cat-fact.herokuapp.com/facts/random',
		type: 'json'
	},
	satellites: {
		url: 'https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/90/ANY/&apiKey=XFR4Y5-ULWYWF-H64T3J-4OKO',
		type: 'json'
	}
};


// add route to create a proxy server
app.get('/proxy/:key?', (req, res) => {
	// console.log("req.params.key =", req.params.key);
	if (!req.params || req.params == {} || !req.params.key || !endpoints[req.params.key]) return res.send("🙃");

	nodeFetch(endpoints[req.params.key].url)
		.then(apiResponse => {
			// console.log("apiResponse =", apiResponse);
			return apiResponse.text();
		})
		.then(text => {
			// console.log("text =", text);
			if (endpoints[req.params.key].type === "json") {
				// convert the API response string to JSON
				let json = JSON.parse(text);
				// console.log(json);
				// return JSON to endpoint
				res.json(json);
			} else if (endpoints[req.params.key].type === "text") {
				res.send(text);
			} else {
				res.send("no results");
			}
		})
		.catch(err => {
			console.error("ERROR", err);
			res.json({
				"ERROR": err
			});
		});
});

// export app for server, server-http, heroku, etc.
module.exports = [app, port];

// app.get('/hello', (req, res) => {
//   Fetch('https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/90/ANY/&apiKey=XFR4Y5-ULWYWF-H64T3J-4OKO'
// ).then(res => res.text())
//   .then(text => {
//     var json = JSON.parse(text);
//     // console.log(json);
//     res.json(json);
//   });
// // .then((data) => {
// //
// //       console.log(data.text());
// //       var resJson = JSON.parse(data.text());
// //       console.log(resJson);
// //       res.json(resJson);
// //
// //     }).catch((err) => {
// //       console.log("error", err);
// //       res.json("error");
// //     });
//      // res.send('Hello World!');
// });
//
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
//
// // export app 
// module.exports = app;
