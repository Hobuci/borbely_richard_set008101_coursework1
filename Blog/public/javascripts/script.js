// When the user scrolls the page, execute moveNavbar
window.onscroll = function() { moveNavbar() };
window.onload = function() { showPagesDiv() };

// Array to store images
var imagesArr = getImageNames();

$(document).ready(function(){
  if(imagesArr){
    img_change();
    cycle_display();
  }
});
// Move navbar
function moveNavbar(){
  // Add the sticky class to the navbar when you reach its scroll position.
  // Remove "sticky" when you leave the scroll position
  var navbar = document.getElementById("nav");
  var navbarOffset = 315; // Navbar offset from the top

  if (window.pageYOffset >= (navbarOffset - 50)) {
    navbar.classList.add("sticky");
  } else{
    navbar.classList.remove("sticky");
  }
}
// Search post
function searchPost(){
  var title = document.getElementById("searchTitle").value;
  var location = document.getElementById("searchLocation").value;
  if(title && title != "Title"){
    window.location.href = "/posts/search/title/" + title + "/1";
    return;
  }
  if(location && location != "Location"){
    window.location.href = "/posts/search/location/" + location + "/1";
  }

}
// Cycle display images
function cycle_display(){
	//call img change every 8s
	setInterval(img_change, 8000);
}
//Change display images
function img_change(){
  // DISPLAY 1
  var randomImg1 = getRnd(0, imagesArr.length - 2); //-2 because the last slot is empty
  document.getElementById("display1Img").src = "/images/uploads/" + imagesArr[randomImg1];

  // DISPLAY 2
  var randomImg2 = getRnd(0, imagesArr.length - 2);
  //to make sure that the same Image doesn't repeat on a page, generate random numbers until they differ
  while(randomImg1 == randomImg2){
    randomImg2 = getRnd(0, imagesArr.length - 2);
  }

  document.getElementById("display2Img").src = "/images/uploads/" + imagesArr[randomImg2];

  // DISPLAY 3
  var randomImg3 = getRnd(0, imagesArr.length - 2);
  while(randomImg3 == randomImg2 || randomImg3 == randomImg1){
    randomImg3 = getRnd(0, imagesArr.length - 2);
  }

  document.getElementById("display3Img").src = "/images/uploads/" + imagesArr[randomImg3];
}
function getRnd(min, max) {
	//returns random number including the min and max value
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
// Get stored image names
function getImageNames(){
  //Javascript will grab the attribute that was written by node and split that to get the image names
  if(document.getElementById("display")){
    var attr = document.getElementById("display").getAttribute("images");
    imagesArr = attr.split('/');
    return imagesArr;
  }
}
// Clears text area
function clearArea(areaName){
  document.getElementById(areaName).value = "";
}
// Checks input fields for new Post
function checkInput(){
  let title = document.getElementById("newTitle").value;
  let location = document.getElementById("newLocation").value;

  if(title == ""){
    alert("Please fill out title field!");
  }
  else if(location == ""){
    alert("Please fill out location field!");
  }
  else{
    $("button#submit").click();
  }
}
// Show pages div on archive page
function showPagesDiv(){
  // Make the PageNumber div visible / invisible depending on which page is active
  // Only display it on the Archive page
  if(window.location.href.includes("posts")
      && !window.location.href.includes("new")
      && !window.location.href.includes("edit")){
    for(var i = 1; i <= 90; i++)
    {
      document.getElementById("pages").style.display = "block";
      document.getElementById("pages").style.opacity = i/100;
    }
  }
  else {
    document.getElementById("pages").style.display = "none";
    document.getElementById("pages").style.opacity = 0;
  }
}
//Delete button functionality
var lastActiveButton;
var pwInput;
$(document).ready(function(){
  $(function() {
    $("button#deletePost").on('click', function(e) {
      if(this.classList.contains("readyToDelete")){
          $target = $(e.target);
          let id = $target.attr('post-id');
          let pw = pwInput.value;

          $.ajax({
            type:'DELETE',
            url: '/posts/delete/' + id + "/" + pw,
            success: function(response){
              console.log('Post successfully deleted ('+id+')');
              window.location.href='/';
            },
            error: function(err){
              console.log(err);
            }
        });
      }
      else{
        // On the first click of the button run this
        this.classList.add("readyToDelete");
        this.style.backgroundImage= "url('../../../../images/deleteReady.png')";
        this.onmouseleave = null;
        lastActiveButton = this;
        // Create password input zone
        pwInput = document.createElement("TEXTAREA");
        this.parentNode.appendChild(pwInput);
        pwInput.classList.add("pwInput");
        // Create cancel button for the active delete button
        var cancelDeleteBtn = document.createElement("BUTTON");
        this.parentNode.appendChild(cancelDeleteBtn);
        cancelDeleteBtn.classList.add("cancelDelete");
        cancelDeleteBtn.onclick = function() {cancelDelete(pwInput, cancelDeleteBtn)};
      }
    });
  });
});
function cancelDelete(pwInput, cancelDeleteBtn){
  lastActiveButton.classList.remove("readyToDelete");
  lastActiveButton.style.backgroundImage= "url('../../../../images/delete.png')";
  //delete input zone
  lastActiveButton.parentNode.removeChild(pwInput);
  //delete cancel button
  lastActiveButton.parentNode.removeChild(cancelDeleteBtn);
}
