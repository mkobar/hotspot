//Define routing rules
//require this file in server.js and pass it app
var mongoose = require('mongoose');
var posts = require('./../controllers/posts.js');

module.exports = function(app) {
	app.get('/posts', function(request, response) {
		posts.show(request, response);
	});

	app.post('/addPost', function(request, response) {
		posts.create(request, response);
	});

	app.post('/updatePost', function(request, response) {
		posts.update(request, response);
	});

	app.post('/removePost', function(request, response) {
		posts.destroy(request, response);
	});

};