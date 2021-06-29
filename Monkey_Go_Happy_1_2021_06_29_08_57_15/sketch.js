var END = 0;
var PLAY = 1;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  //creating sprite for monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving",
  monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  
  //creating the group of food and obstacle
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
 
}


function draw() {
background("pink");
  
 
  
  
  
  
  if(FoodGroup.isTouching(monkey)){
    score = score +1;
  banana.visible = false;
      }
  
   //spawning bananas and obstacles
  Obstacles();
  Food();
  
  if (ground.x<0) {
    ground.x = ground.width/2;
  }
 
  
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  
 
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  
  var survivalTime = 0;
  
  stroke = "white";
  textSize("20");
  fill = ("white");
  
  stroke = "black";
  textSize ("20");
  fill = ("black");
  survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time: " + survivalTime,100,50);
  
  stroke = "black";
  textSize  ("10");
  fill = ("black");
  text("Score : "+ score, 300, 50);
  
  
  if(gameState === END) {
    
     survivalTime = 0;
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  }
   if(obstacleGroup.isTouching(monkey)){
   text("Game Over !!!", 200, 200);
    gameState = END;
  }
 
  
  drawSprites();
}

 
function Obstacles() {
 if(frameCount % 100 === 0){
    obstacle = createSprite(500,Math.round(random(310,310)),10,10)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -6;
    obstacle.scale = 0.2;
    obstacle.lifetime = 500;         
    obstacleGroup.add(obstacle);        
 }       
  }
function Food() {
  if(frameCount % 150 === 0){
    banana = createSprite(670,      Math.round(random(170,200)),10,10);
    banana.velocityX = -6
    banana.addImage(bananaImage)
    banana.lifetime = 500;
    banana.scale = 0.1;
    
    FoodGroup.add(banana);
  }
}





