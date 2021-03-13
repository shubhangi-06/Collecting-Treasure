//game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path, boy, cash, diamonds, jewelry, sword, endPic;
var pathImg, boyImg, cashImg, diamondsImg, jewelryImg, swordImg, endImg;
var treasureCollection = 0;
var cashG, diamondsG, jewelryG, swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  createCanvas(400,400);
  
  //moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale=0.08;
  
  //creating groups for each object
  cashG=new Group();
  diamondsG=new Group();
  jewelryG=new Group();
  swordGroup=new Group();
  
  //creating the endPic sprite and making it invisible
  endPic = createSprite(200,200);
  endPic.addAnimation("endImage", endImg);
  endPic.scale = 0.8;
  endPic.visible = false;
}

function draw() {
  background(0);
  
  //making the boy follow the mouse's x position
  boy.x = World.mouseX;
  
  //creating edge sprites and making the boy collide with them
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  //creating the treasures and obstacles
  createCash();
  createDiamonds();
  createJewelry();
  createSword();

  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasureCollection = treasureCollection + 50;
  }
  else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasureCollection = treasureCollection + 100;
      
  }else if(jewelryG.isTouching(boy)) {
    jewelryG.destroyEach();
    treasureCollection = treasureCollection + 150;
      
  }else{
    if(swordGroup.isTouching(boy)) {
      gameState = END;
      boy.visible = false;
    }
  }
  
  if (gameState === END){
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jewelryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    path.y = 0;
    
    cashG.destroyEach();
    diamondsG.destroyEach();
    jewelryG.destroyEach();
    swordGroup.destroyEach();
    
    endPic.visible = true;
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
}
}

function createJewelry() {
  if (World.frameCount % 80 == 0) {
    var jewelry = createSprite(Math.round(random(50, 350),40, 10, 10));
    jewelry.addImage(jewelryImg);
    jewelry.scale=0.13;
    jewelry.velocityY = 3;
    jewelry.lifetime = 150;
    jewelryG.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}