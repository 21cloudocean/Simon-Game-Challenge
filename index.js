// create a new pattern
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClikcedPattern = [];

var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColor = buttonColors[randomNumber];
var i = gamePattern.length;
var inputPosition = userClikcedPattern.length - 1;
var rightColor = gamePattern[inputPosition];
var started = false;
//我一开始没加这个布尔变量
$(document).keydown(function() {
  if (!started) {
    //我之前用的条件是（i===0）
    nextSequence();
    started = true;
    //我的代码没加布尔变量
  }
  // else if ($("h1").text()="Game Over, Press Any Key to Restart"){
  //   startOver();
  // }这段else不需要，只要start=false，就会执行这个keydown Method。
  //我把startOver放到按错键之后执行的method中了
});









//show the sequence to user with animations and sounds
//点击按钮后出现flash的效果与点击的target不一致的情况


$(".btn").click(function(event) {
  var userChosenColor = $(this).attr("id");
  // var userChosenColor = event.currentTarget.id;
  /*上面一行注释是我的原代码*/
  userClikcedPattern.push(userChosenColor);
  inputPosition = userClikcedPattern.length - 1;
  // rightColor = gamePattern[inputPosition];

  playSound(userChosenColor);
  animatePress(userChosenColor);
  // playSound(randomChosenColor);
  // animatePress(randomChosenColor);
  /*上面两行注释是我的原代码，
  播放的是nextSequence（）里本次放入gamePattern的item效果
  所以不对*/


  if (userClikcedPattern[inputPosition] === gamePattern[inputPosition]) {
    /*我原来的if条件：(userChosenColor === rightColor)
    这里不应该用userChosenColor，
    否则会把当下点的button颜色与gamePattern里的比对
    而不是对比两个数组
    而且应该把确认环节放在playSound（）的后面，不管点哪个都要有声音
    而不是点到正确的才有声音
    补充：if条件误写成(gamePattern[inputPosition] === rightColor)
    导致不论点哪个按钮，只要点一次level都会增加*/


    if (userClikcedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    // i = gamePattern.length;
    // if (userClikcedPattern.length = i) {
    /*遇到问题：只要点一次按钮就会level+1，且每次只能点gamePattern[0]那个颜色*/
    // if (userClikcedPattern === gamePattern) {
    /*遇到问题：两个数组完全一致也不会调用nextSequence函数，再点就会wrong*/

  } else {
    // var wrongSound = new Audio ("sounds/wrong.mp3");
    // wrongSound.play();
    playSound("wrong");
    // $("body").addClass("game-over");
    //   $("#level-title").text("Game Over, Press Any Key to Restart");
    //
    // setTimeout(function(){
    //   $("body").removeClass("game-over");
    // },200);
    gameOver();
    startOver();
  }
});

function nextSequence() {
  userClikcedPattern = [];
  i = gamePattern.length;
  $("h1").text("Level " + i);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).animate({
    opacity: 0
  }).animate({
    opacity: 100
  });
  i = gamePattern.length;
  return;
}

function playSound(chosenColor) {
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}
// function playSound (chosenColor){
// switch(chosenColor) {
//   case "red":
//   var redSound = new Audio ("sounds/red.mp3");
//   redSound.play();
//   break;
//
//   case "blue":
//   var blueSound = new Audio ("sounds/blue.mp3");
//   blueSound.play();
//   break;
//
//   case "green":
//   var greenSound = new Audio ("sounds/green.mp3");
//   greenSound.play();
//   break;
//
//   case "yellow":
//   var yellowSound = new Audio ("sounds/yellow.mp3");
//   yellowSound.play();
//   break;
//
//   default:console.log(chosenColor);
// }
// }


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
}
/*把startOver放在gameOver下面，结果不显示这个function的效果了
不再把它当成一个函数，把内容直接放在按错之后的mothod里。
补充：经测试不显示“Game Over, Press Any Key to Restart”
是因为把nextSequence()直接放在starOver()里一起执行了
gameOver()到底要不要单独做成函数与此无关*/

function startOver() {
  gamePattern = [];
  i = gamePattern.length;
  started = false;
  //我的代码没加布尔变量
  // nextSequence();
  //经测试不显示“Game Over, Press Any Key to Restart”是因为这个函数
}
