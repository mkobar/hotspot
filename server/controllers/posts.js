var mongoose = require('mongoose');
var Post = mongoose.model('Post'); //assign the variable so that the controller has access to the model

//define CRUD operations - eventually send to the routes - export a called function that returns an object
//same as exporting an object
module.exports = (function() {
	return {
    total_post_count: function(request, response){
      Post.count({}, function( error, count){
         if(error){
          console.log('db count -->', count);
         } else {
          console.log('count from tpc -->', count);
          response.json(count);
          console.log('total_post_count query successful');
         }
      });
    },
		show: function(request, response) {
			Post.find({}, function(error, results) {
				if(error) {
				  console.log('error in show');
				} else {
					console.log('show query successful');
          response.json(results);
				}
			}).sort({_id:1}).limit(4);
		},

		create: function(request, response) {
			var post = new Post({ //document is an instance of a model
				upvotes: request.body.upvotes, //request.body is the contents of the data entered in the client
				comments: request.body.comments,
				imageURI: request.body.imageURI,
				caption: request.body.caption,
        location: request.body.location,
				hashtag: request.body.hashtag
			});
			post.save(function(error) {
				if(error) {
					console.log('error in create');
				} else {
					console.log('create query successful');
					response.status(200);
				}
			});
		},

		update: function(request, response) { // update takes in a (query, update object, and callback)
      Post.findOne({_id: request.body.id}, function(error, post) {
				if(error) { console.log('error in update');}
        if(request.body.comment){
          post.comments.push(request.body.comment);
        } else {
          console.log('update query successful');
          post.upvotes++;
        }
        post.save(function(error){
          if(error) console.log('error in adding new comment');
        });
			});

		},

		destroy: function(request, response) {
			Post.remove({_id: request.body.id}, function(error) {
					if(error) {
						console.log('error in destroy');
					} else {
						console.log('destroy query successful');
  					response.end();
          }
			});
		},

		find_by_id: function(request, response){

			Post.find({_id: request.params.id}, function(error, result){
				if(error) {
					console.log('error in find_by_id');
				} else {
          console.log('find_by_id query successful');
          response.json(result[0]); //object return back is wrapped in an array, so I'm directly accesing it's value
				}
			});
		},

    get_next_posts: function(request, response){
      Post.find({ _id: {$gt: request.query.id}}, function(error, results){
        if(error){
          console.log('error in get_next_posts');
        } else {
          console.log('get_next_posts query successfull');
          console.log('results from get_next_posts-->',results.length , '/n', results);
          response.json(results);
        }
      }).limit(3);
    }
	};
})();


