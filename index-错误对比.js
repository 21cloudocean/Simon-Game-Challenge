// create a new pattern
var buttonColors = ["red","blue","green","yellow"];
var gamePattern =[];
var userClikcedPattern = [];
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColor = buttonColors[randomNumber];
var i = gamePattern.length;
var inputPosition = userClikcedPattern.length-1;
var rightColor = gamePattern[inputPosition];
  $(document).keydown(function(){
      if(i===0){
  nextSequence();
}else if ($("h1").text()="Game Over, Press Any Key to Restart"){
  startOver();
}
});









//show the sequence to user with animations and sounds



$(".btn").click(function(event){
  var userChosenColor = event.currentTarget.id;
  userClikcedPattern.push(userChosenColor);
inputPosition = userClikcedPattern.length-1;
rightColor = gamePattern[inputPosition];
  if (userChosenColor === rightColor) {
    playSoundRight(randomChosenColor);
    animatePress(randomChosenColor);
    if (userClikcedPattern.length = i) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongSound = new Audio ("sounds/wrong.mp3");
    wrongSound.play();
    gameOver();
  }
});

function nextSequence(){
  i = gamePattern.length;
      $("h1").text("Level " + i);
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#"+randomChosenColor).animate({opacity:0}).animate({opacity:100});
userClikcedPattern = [];
i= gamePattern.length;
  return;
}

function playSoundRight (chosenColor){
switch(chosenColor) {
  case "red":
  var redSound = new Audio ("sounds/red.mp3");
  redSound.play();
  break;

  case "blue":
  var blueSound = new Audio ("sounds/blue.mp3");
  blueSound.play();
  break;

  case "green":
  var greenSound = new Audio ("sounds/green.mp3");
  greenSound.play();
  break;

  case "yellow":
  var yellowSound = new Audio ("sounds/yellow.mp3");
  yellowSound.play();
  break;

  default:console.log(chosenColor);
}
}


function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function () {
  $("#"+currentColor).removeClass("pressed");
}, 100);
}

function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
    $("h1").text("Game Over, Press Any Key to Restart");
}
function startOver(){
gamePattern =[];
i = gamePattern.length;
nextSequence();
}
