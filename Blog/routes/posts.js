var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var router = express.Router();
// Load in model
let Post = require('../models/post');
var query = null;
var adminPassword= "apples";

// Count number of items in database
var getCount = function(req, callback){
	Post.find(query, function(err, posts){
	}).count(function(err, count){
		if(err){
			console.log(err);
		}else {
			callback(null, count);
		}
	})
}
// Calculate amount of pages needed to display (5 Post / page)
function getPages(postCount){
	if(postCount % 5 == 0)
		return postCount / 5;
	else
		return Math.floor(postCount / 5) + 1;
}

/* Middleware */
// Multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });
// Bodyparser
let jsonParser = bodyParser.json();
// Mongodb
//mongoose.connect('mongodb://localhost/blog');
mongoose.connect('mongodb://hobuci:applepie@ds046067.mlab.com:46067/blog');
let db = mongoose.connection;
// Check connection
db.once('open', function(){
	console.log('Connected to MongoDB');
})
// Check for db errors
db.on('error', function(err){
	console.log(err);
})

/* Routes */
/**********/
router.get('/search', function(req, res) {
	res.render('search', { pageTitle: "Search",
	skin: skin });
});

router.get('/search/title/:title/:page', function(req, res) {
	//return specific obj
	query = { title:req.params.title };
	Post.find(query, function(err, posts){
		if(err){
			console.log(err);
		}else {
			getCount({}, function(err, count){
				if(err){
					console.log(err)
				}else {
					res.render('searchResult', { pageTitle: "Search Result",
	        skin: skin, posts: posts , postCount: count, pages: getPages(count), pageNumber: parseInt(req.params.page)});
				}
			});
		};
	});
});

router.get('/search/location/:location/:page', function(req, res) {
	//return specific obj
	query = { location:req.params.location };
	Post.find(query, function(err, posts){
		if(err){
			console.log(err);
		}else {
			getCount({}, function(err, count){
				if(err){
					console.log(err)
				}else {
					console.log(posts);
					res.render('searchResult', { pageTitle: "Search Result",
	        skin: skin, posts: posts , postCount: count, pages: getPages(count), pageNumber: parseInt(req.params.page)});
				}
			});
		};
	});
});

router.get('/new', function(req, res) {
	res.render('new', { pageTitle: "Add new post",
	skin: skin });
});

router.post('/new/add', jsonParser, upload.any(), function(req, res){
	let newPost = new Post();
// Get data
	newPost.title = req.body.title;
	newPost.location = req.body.location
	if(req.files[0])
		newPost.img = req.files[0].filename;
	else {
		newPost.img = "N/A";
	}
	newPost.text = req.body.text;
// Save
	newPost.save(function(err){
		if(err){
			console.log(err);
			return;
		}
		else {
			res.render('added', { pageTitle: "Archives" });
		}
	})
});

router.get('/edit/:id', function(req, res) {
	Post.findById(req.params.id, function(err, post){
		res.render('edit', { pageTitle: "Edit post",
		skin: skin, post: post });
	});
});

router.post('/edit/:id/submit', jsonParser, upload.any(), function(req, res){

	let post = {};
	query = { _id:req.params.id }

	post.title = req.body.title;
	post.location = req.body.location

	if(req.files[0]){
		post.img = req.files[0].filename;
	}
	else if(req.body.imgEx){
		post.img = req.body.imgEx;
	}
	else {
		post.img = "N/A";
	}
	post.text = req.body.text;

	Post.update(query, post, function(err){
		if(err){
			console.log(err);
			return;
		}
		else {
			res.render('edited', { pageTitle: "Archives" });
		}
	});
});

router.delete('/delete/:id/:pw', function(req, res) {
	let query = { _id:req.params.id }
	let pw = req.params.pw;

	if(pw == adminPassword){
		Post.remove(query, function(err){
			if(err){
				console.log(err);
			}
			else {
				res.send('Success');
			}
		});
	}
	else {
		console.log("Wrong password");
	}
});

router.get('/:page', function(req, res) {
	query = null;

	Post.find(query, function(err, posts){
		if(err){
			console.log(err);
		}else {
			getCount({}, function(err, count){
				if(err){
					console.log(err);
				}else {
					res.render('post', { pageTitle: "Archives",
	        skin: skin, posts: posts , postCount: count, pages: getPages(count), pageNumber: parseInt(req.params.page) });
				}
			});
		};
	});
});

module.exports = router;
