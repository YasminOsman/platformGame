var player;
var ground, ground2;
var gameState = "SERVE";
var score = 0;

function setup() {
  createCanvas(800,400);
  player = createSprite(400, 230, 50, 50);
    player.x = 50;
  ground = createSprite(400, 390, 1600, 10);
    ground.x = ground.width/2;
  ground2 = createSprite(400, 250, 1600, 10);
    ground2.x = ground2.width/2;
  platformGroup = new Group();
}

function draw() {
  background(0);
  text("Score: "+ score, 700, 100);
  if(gameState === "SERVE"){
    text("PRESS 'SPACE' TO START", 400, 200);
    ground2.velocityX = -2;
    if(ground2.x<0){
      ground2.x = ground.width/2;
    }
    player.collide(ground2);
    if(keyDown("space")){
      gameState = "PLAY";
    }
  }
  if(gameState === "PLAY"){
    if(keyDown("space")) {
      player.velocityY = -10;
    }
    score = Math.round(World.frameCount/5);
    player.velocityY = player.velocityY+0.8;
    if(keyDown("RIGHT_ARROW")) {
      player.x = player.x+5;
    }
    ground.velocityX = -2;
    if(ground.x<0){
      ground.x = ground.width/2;
    }
    player.collide(ground); 
    platform();
    if(isTouching(player, platformGroup)){
      if(isTouching(player, ground)){
      gameState = "END";
      }
    }  
  }
  else if(gameState === "END") {
    player.velocityY = 0;
    ground.velocityX = 0;
    platformGroup.setVelocityXEach(0); 
    platformGroup.setLifetimeEach(-1);
    text("GAME OVER", 400, 200);

  }
  console.log(gameState);
  console.log(player.y);
  drawSprites();
}

function platform() {
  if(frameCount%120=== 0) {
    var platform = createSprite(800,100,50,30);
    var rand1 = Math.round(random(250, 300));
      platform.y = rand1;
      platform.height = 2*(390 - platform.y);
      platform.collide(ground);
      platform.velocityX = -3;
    var rand2 = Math.round(random(50, 80));
      platform.width = rand2;
      platform.lifetime = 267;
      platformGroup.add(platform);
  }
}