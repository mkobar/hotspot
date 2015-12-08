var mongoose = require('mongoose');
var Post = mongoose.model('Post'); //assign the variable so that the controller has access to the model

//define CRUD operations - eventually send to the routes - export a called function that returns an object
//same as exporting an object
module.exports = (function() {
	return {
		show: function(request, response) {
			Post.find({}, function(error, results) {
				if(error) {
				  console.log('error in show');
				} else {
					response.json(results);
					console.log('success');
				}
			});
		},
		create: function(request, response) {
			var post = new Post({ //document is an instance of a model
				upvotes: request.body.upvotes, //request.body is the contents of the data entered in the client
				comments: request.body.comments,
				imageURI: request.body.imageURI, //imageURL
				caption: request.body.caption,
				location: request.body.location
			});
			post.save(function(error) {
				if(error) {
					console.log('error in create');
				} else {
					console.log('success');
					response.status(200);
				}

			});
		},
		update: function(request, response) { // update takes in a (query, update object, and callback)
			Post.update({_id: request.body.id},
				{upvotes: request.body.upvotes,
				comments: request.body.comments,
				imageURI: request.body.imageURI,
				caption:request.body.caption,
				location:request.body.location}, function(error) {
					if(error) {
						console.log('error in update');
					} else {
						console.log('success');
					}
			});
		},
		destroy: function(request, response) {
			Post.remove({_id: request.body.id}, function(error) {
					if(error) {
						console.log('error in destroy');
					} else {
						console.log('success');
					}
					response.end();
			});
		},
		find_by_id: function(request, response){
      console.log('inside ...find_by_id');console.log('--request.params.id', request.params.id);

			Post.find({_id: request.params.id}, function(error, result){
				if(error) {
					console.log('error in find_by_id');
				} else {
          console.log('inside of else of find_by_id'); console.log(JSON.stringify(result[0]));
          response.json(result[0]); //object return back is wrapped in an array, so I'm directly accesing it's value
				}
			});
		}
	};
})();


