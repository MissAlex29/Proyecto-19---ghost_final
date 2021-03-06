var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  //al final del setup 
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  ghost.debug = true;
  ghost.setCollider("rectangle",0,0,180,ghost.height);
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);
  if(gameState === "play"){
        if(tower.y > 400){
            tower.y = 300
        }
        ghost.velocityX = 0;
        if(keyDown("left_arrow")){
            ghost.velocityX = -3;
        }
        if(keyDown("right_arrow")){
            ghost.velocityX = 3;
        }
        if(keyDown("space")){
            ghost.velocityY = -5;
        }
        ghost.velocityY = ghost.velocityY + 0.8;
        if(climbersGroup.isTouching(ghost)){
            ghost.velocityY = 0;
        }
        if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
            ghost.destroy();
            gameState = "end";
        }
        spawnDoors();
        drawSprites();
  }
  if(gameState === "end"){
      background("black")
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over", 230,250);
  }    
}

function spawnDoors(){
    if(frameCount % 240 === 0){
        door = createSprite(200,-50);
        door.x = Math.round(random(120,400));
        door.addImage(doorImg); 
        door.velocityY = 1;
        door.lifetime= 800;
        climber = createSprite(200,10);
        climber.addImage(climberImg);
        climber.x = door.x;
        climber.velocityY = 1;
        climber.lifetime = 800;
        invisibleBlock = createSprite(200,15);
        invisibleBlock.width = climber.width;
        invisibleBlock.height = 2;
        invisibleBlock.x = door.x;
        invisibleBlock.velocityY = 1;
        invisibleBlock.lifetime = 800;
        invisibleBlock.visible = true;
        invisibleBlock.debug = true;
        doorsGroup.add(door);
        climbersGroup.add(climber);
        invisibleBlockGroup.add(invisibleBlock);
        ghost.depth = door.depth && climber.depth;
        ghost.depth = ghost.depth +1;
    }
    
}

