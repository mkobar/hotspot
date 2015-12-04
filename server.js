var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded

var path = require('path');
//set up a static file server that points to the client directory
app.use(express.static(path.join(__dirname, './www')));

//import mongoose.js
require('./server/config/mongoose.js');

//pass in app to routes.js
require('./server/config/routes.js')(app);

app.listen(3000, function() {
	console.log('listening at port 3000');
})
