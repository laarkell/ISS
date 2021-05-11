"use strict";

/**
*	Server - Require and start running app as server
*/

// require main app and port (using destructuring)
const [app, _port] = require('./app');

// set port (required for heroku, which sets own port)
const port = process.env.PORT || _port;

// start listening for requests
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
});

// export app
module.exports = app;
