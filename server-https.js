/**
 *	Server HTTPS - Require and start running app as server - A version that runs HTTPS
 */

// require main app and port (using destructuring)
const [app, port] = require('./app');

// HTTPS dependencies
const https = require('https');
const fs = require('fs');
var key = fs.readFileSync('/private/etc/apache2/server.key');
var cert = fs.readFileSync('/private/etc/apache2/server.crt');
var options = {
	key: key,
	cert: cert
};

// use HTTPS to create server
var server = https.createServer(options, app);
// start listening for requests
server.listen(port, () => {
	console.log(`Example HTTPS app listening at https://localhost:${port}`);
});

// export app for heroku
module.exports = app;
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
