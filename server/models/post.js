var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	upvotes: Number,
	comments: Array,
	imageURI: String,
	caption: String,
	location: Object
});

//instantiate the model using a Schema
mongoose.model('Post', PostSchema);

