var mongoose = require('mongoose');

let postSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  img:{
    type: String,
    required: true
  },
  text:{
    type: String,
    required: true
  }
});

let Post = module.exports = mongoose.model('Post', postSchema);
