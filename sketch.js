var spaceship,spaceshipImg;
var alienGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var playAgain, playAgainImg;
var laserImg,laserGroup;
var score = 0;
var earth, earthImg;
var meteorImg;
laserSound;

function preload(){
  spaceshipImg = loadImage("spaceship.png");
  playAgainImg = loadImage("playAgainButton2x.png");
  laserImg = loadImage("laser.png");
  earthImg = loadImage("earth.png");
  meteorImg = loadImage("meteor.png");
  laserSound = loadSound("heat-vision.mp3");
}

function setup() {
  createCanvas(800,800);
  spaceship = createSprite(200,350,20,20);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.3;

  playAgain = createSprite(400,200,20,20);
  playAgain.addImage(playAgainImg);
  
  alienGroup = new Group();
  laserGroup = new Group(); 

  earth = createSprite(400,700,800,20);
  earth.addImage(earthImg);
  earth.scale = 2;
}

function draw() {
  background("white");
  textSize(60);
  textAlign(CENTER,TOP);
  textFont("Impact");
  fill("yellow");
  stroke("red");
  strokeWeight(5);

  text("Score: " + score, 550,100);

  if(gameState === PLAY){
   playAgain.visible = false;
   
    if(keyCode === LEFT_ARROW){
    spaceship.velocity.x = -5;
  }
  if(keyCode === RIGHT_ARROW){
    spaceship.velocity.x = 5;
  }

  if(alienGroup.isTouching(spaceship)||alienGroup.isTouching(earth)){
    alienGroup.lifetime = -1;
    gameState = END;
    text("You Lose",100,200);
  }

  if (keyDown("space")) {
    laserSound.play();
    createlaser();
    
  }
  if(laserGroup.isTouching(alienGroup)){
    score++
    alienGroup.destroyEach();
  }

 spawnAlien();

}

if(gameState === END){
    playAgain.visible = true;
    spaceship.velocity.x = 0;
    alienGroup.setVelocityYEach(0);
    alienGroup.setLifetimeEach(-1);

    if(mousePressedOver(playAgain)){
      alienGroup.destroyEach();
      gameState = PLAY;
    }
}
  
  drawSprites();
}

function spawnAlien(){
  if(frameCount % 60 === 0){
    var alien = createSprite(random(100,750),20,20,20);
    alien.addImage(meteorImg);
    alien.velocity.x = 0;
    alien.velocity.y = 3;
    alien.lifetime = 200;
    alienGroup.add(alien);
    alienGroup.setScaleEach(0.25);
  }
}
function createlaser() {
  var laser= createSprite(100,100, 50, 10);
  laser.addImage(laserImg);
  laser.x = spaceship.x;
  laser.y= spaceship.y;
  laser.velocityY = -4;
  laser.lifetime = 100;
  laser.scale = 0.3;
  laserGroup.add(laser);
  laserGroup.setScaleEach(0.01);
   
}