//Define routing rules
//require this file in server.js and pass it app
var mongoose = require('mongoose');
var posts = require('./../controllers/posts.js');

module.exports = function(app) {
  //get posts from database
	app.get('/posts', function(request, response) {
    console.log('GET to /posts worked');
		posts.show(request, response);
	});

  //create a post
	app.post('/addPost', function(request, response) {
		posts.create(request, response);
		response.send();
	});

  //add comment to a post
	app.post('/posts/:id/comments', function(request, response) {
    console.log('inside POST (server) /posts/:id/comments');
    console.log('request.body',request.body);
		posts.update(request, response);
		response.send();
	});

  //upvote a post
  app.put('/posts/:id/upvote', function(request, response) {
    console.log('inside POST (server) /posts/:id/comments');
    console.log('request.body',request.body);
    posts.update(request, response);
    response.send();
  });

  //remove a post
	app.post('/removePost', function(request, response) {
		posts.destroy(request, response);
		response.send();
	});

  //returning a single post
	app.get('/posts/:id', function(request, response){
    console.log('GET to /posts/:id ..worked');
		posts.find_by_id(request, response);
	});

};
