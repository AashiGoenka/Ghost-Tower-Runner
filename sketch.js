var gameState="play";
var sound;
var tower, towerImage;
var door, doorImage, doorGroup;
var railing, railingImage, railingGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  doorGroup = new Group();
  railingImage = loadImage("climber.png");
  railingGroup = new Group();
  ghostImage = loadImage("ghost-standing.png");
  invisibleBlockGroup = new Group();
  sound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  sound.loop();
  tower=createSprite(350, 350);
  tower.addImage("towerImage", towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200, 200, 50, 50);
  ghost.addImage("ghostImage", ghostImage);
  ghost.scale=0.4;
}

function draw(){
  background(0);
  
  if(gameState==="play"){
    
  
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  if(keyDown("left_arrow")){
    ghost.x= ghost.x -3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  }
  
  if(railingGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
  spawnDoors();
  drawSprites();
}
 if(gameState==="end"){
   textSize(30);
   fill("red");
   text("GAME OVER", 200, 250);
 } 
}
function spawnDoors(){
  if(frameCount%200 === 0){
    door=createSprite(200, -50);
    door.addImage("doorImage", doorImage);
    var railing=createSprite(200, 10);
    railing.addImage("railingImage", railingImage);
    invisibleBlock=createSprite(200, 15);
    invisibleBlock.width = railing.width;
    invisibleBlock.height=2;
    invisibleBlock.velocityY=1;
    
    invisibleBlock.debug=true;
    door.x = round(random(150, 400));
    door.velocityY=1;
    railing.velocityY=1;
    railing.x = door.x;
    invisibleBlock.x=door.x;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    door.lifetime=800;
    railing.lifetime=800;
    invisibleBlock.lifetime=800;
    doorGroup.add(door);
    railingGroup.add(railing);
    invisibleBlockGroup.add(invisibleBlock);
  }
}


 