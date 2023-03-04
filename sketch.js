var balloon,balloonImage1,balloonImage2;
var database;
var height,score,player1;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon-01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
   "Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
   "Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);
  score = 0

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20);

  balloon2=createSprite(550,650,150,150);
  balloon2.addAnimation("hotAirBalloon",balloonImage1);
  balloon2.scale=0.5;

  var balloon2Height=database.ref('balloon/player1');
  balloon2Height.on("value",readHeight2, showError);
  textSize(20);
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0,+1);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-50,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }


  if(keyDown(65)){
    updatePlayer1(-10,0,0);
    balloon2.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(68)){
    updatePlayer1(10,0,+1);
    balloon2.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(87)){
    updatePlayer1(0,-50,0);
    balloon2.addAnimation("hotAirBalloon",balloonImage2);
    balloon2.scale=balloon2.scale -0.005;
  }
  else if(keyDown(83)){
    updatePlayer1(0,+10,0);
    balloon2.addAnimation("hotAirBalloon",balloonImage2);
    balloon2.scale=balloon2.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  text("Balloon1 score: "+balloon.score,40,100)
  text("Balloon2 score: "+balloon2.score,40,200)
}


function updatePlayer1(x,y,score){
  database.ref('balloon/player1').set({
    'x': player1.x + x ,
    'y': player1.y + y,
    "score":player1.score+score
  })
}
function updateHeight(x,y,score){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y,
    "score":height.score+score
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
  balloon.score = height.score
}
function readHeight2(data){
  player1 = data.val();
  console.log(player1.x);
  balloon2.x = player1.x;
  balloon2.y = player1.y;
  balloon2.score = player1.score
}

function showError(){
  console.log("Error in writing to the database");
}
