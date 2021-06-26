var spaceCraft,spacecraftimage
var asteroid
var SpaceImg
var asteroidimage
var alienimage,alien
var bullet
var bulletimage
var bulletGroup,asteroidGroup,alienGroup
var gameState="play"
var gameover,gameoverImg
var restart,restartImg
var score=0
var sound

function preload(){

SpaceImg=loadImage("SpaceBackground.jpg")
asteroidimage=loadImage("Asteroid.png")
alienimage=loadImage("Alien.png")
spacecraftimage=loadImage("Spacecraft.png")
bulletimage=loadImage("bullet1.png")
gameoverImg=loadImage("gameover1.png")
restartImg=loadImage("restart.png")
sound=loadSound("GameSound.wav")

}

function setup() {
  createCanvas(1300,700);

 spaceCraft = createSprite(600, 700, 50, 50);
 spaceCraft.addImage(spacecraftimage)
 spaceCraft.scale=0.6
 spaceCraft.setCollider("rectangle",0,0,200,400)
// spaceCraft.debug=true

gameover=createSprite(650,400,50,50)
gameover.addImage(gameoverImg)

restart=createSprite(650,500,50,50)
restart.addImage(restartImg)
restart.scale=0.3

 bulletGroup=new Group();
 alienGroup=new Group();
 asteroidGroup=new Group();

}

function draw() {
  background(SpaceImg);  

  fill("black")
  textSize(35)
  text("Score: "+score,200,100)

  fill("black")
  textSize(30)
  text("Mission : Save The Earth",500,50)

  if(gameState=="play"){

sound.play()

    spawnAsteroid();
    spawnAlien();
    
restart.visible=false
gameover.visible=false

  if(bulletGroup.isTouching(alienGroup)){
    alienGroup.destroyEach();
    bulletGroup.destroyEach();
    score=score+10
  }
  
  if(bulletGroup.isTouching(asteroidGroup)){
    asteroidGroup.destroyEach();
    bulletGroup.destroyEach();
    score=score+20
  }

if(alienGroup.isTouching(spaceCraft) || asteroidGroup.isTouching(spaceCraft))
gameState="end"
  }
else if(gameState=="end"){
alienGroup.setVelocityYEach(0)
asteroidGroup.setVelocityYEach(0)
spaceCraft.velocityX=0
alienGroup.setLifetimeEach(-1)
asteroidGroup.setLifetimeEach(-1)
restart.visible=true
gameover.visible=true
sound.stop()

if(mousePressedOver(restart)){
reset();
}
}


  drawSprites();
}


function spawnAsteroid(){
if(frameCount%120==0){
   asteroid = createSprite(500,0,50,50);
   asteroid.x=Math.round(random(100,1100))
   asteroid.velocityY=4
   asteroid.lifetime=200
   asteroid.scale=0.2
   asteroid.addImage(asteroidimage)
   asteroidGroup.add(asteroid)
   asteroid.depth=gameover.depth
gameover.depth=gameover.depth+1
}


}

function spawnAlien(){
  if(frameCount%160==0){
    alien = createSprite(500,0,50,50);
    alien.x=Math.round(random(100,1100))
    alien.velocityY=4
    alien.lifetime=200
    alien.scale=0.2
    alien.addImage(alienimage)
    alienGroup.add(alien)
    alien.depth=gameover.depth
    gameover.depth=gameover.depth+1
 }


}


function createBullet(){
bullet=createSprite(600,700,50,10)
bullet.x=spaceCraft.x
bullet.velocityY=-5
bullet.lifetime=100
bullet.addImage(bulletimage)
bullet.scale=0.6
bulletGroup.add(bullet)
}


function keyPressed(){

if(keyCode==RIGHT_ARROW){
  spaceCraft.velocityX=7
}


if(keyCode==LEFT_ARROW){
  spaceCraft.velocityX=-7
}

if(keyCode==32){
createBullet();
}
}

function reset(){
gameState="play"
gameover.visible=false
restart.visible=false
alienGroup.destroyEach()
asteroidGroup.destroyEach()
score=0
}