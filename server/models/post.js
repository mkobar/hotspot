var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	upvotes: Number,
	comments: String, //array of strings
	imageURI: String,
	caption: String,
	location: String
});

//instantiate the model using a Schema
mongoose.model('Post', PostSchema);

