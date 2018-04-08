var express = require('express');
var router = express.Router();
// Load in model
let Post = require('../models/post');

// Home page
router.get('/', function(req, res){
  Post.find({}, function(err, posts){
    let images = "";

    if(err){
      console.log(err);
    }
    else {
      posts.forEach(function(post){
        if(post.img != "N/A"){
          images += post.img + "/";
        }
      });

      res.render('home', {
        pageTitle: "Travel Blog",
        images: images,
        skin: skin
      });
    }
  });
});

// Skin change
router.get('/:skin', function(req, res){
  Post.find({}, function(err, posts){

    if(req.params.skin == "dark" || req.params.skin == "bright"){
          skin = req.params.skin;
    }
    let images = "";

    if(err){
      console.log(err);
    }
    else {
      posts.forEach(function(post){
        if(post.img != "N/A"){
          images += post.img + "/";
        }
      });

      res.render('home', {
        pageTitle: "Travel Blog",
        images: images,
        skin: skin
      });
    }
  });
});

module.exports = router;
