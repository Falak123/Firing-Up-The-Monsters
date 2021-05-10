var PLAY = 1;
var END = 0;
var serve;
var gameState = serve;

var bee,beeImg;
var wall,wall1Img,wall2Img,wall3Img,wall4Img,wall5Img;
var gold,goldImg;
var getReady,getReadyImg;
var fire,fireImg,fireBall,fireBallImg;
var alien,alienImg;
var obstacleImg;
var monsterImg,monImg;
var player,playerImg;
var dragonFireImg;
var invisibleBlock;
var dragonSound,monsterSound,alienSound;
var backSound;
var coinCollectingSound;
var getReady,getReadyImg;
var fiImg,fi,fiSound,firSound;
var gameOver,gameOverImg,gameOverSound;
var reset,resetImg;

var score = 0;
var g = 0;

function preload(){
  // to preload images and sounds
  beeImg = loadImage("bee ani.gif");
  wall1Img = loadImage("wall1.png");
  wall2Img = loadImage("wall2.png");
  wall3Img = loadImage("wall3.png");
  wall4Img = loadImage("wall4.png");
  wall5Img = loadImage("wall5.png");
  goldImg = loadImage("gold.png");
  alienImg = loadImage("ali.png");
  fireBallImg = loadImage("fire.gif");
  obstacleImg = loadImage("ob.gif");
  monsterImg = loadImage("mon3.gif");
  playerImg = loadImage("pl.gif");
  monImg = loadImage("mon2.gif");
  fireImg = loadImage("fire.png");
  dragonFireImg = loadImage("fire2.gif");
  getReadyImg = loadImage("getReady.png");
  fiImg = loadImage("f.gif");
  gameOverImg = loadImage("gameover2.png");
  resetImg = loadImage("re.png");
  
  dragonSound = loadSound("DragonSound.mp3");
  monsterSound = loadSound("Monster_Footsteps.mp3");
  alienSound = loadSound("scaryLaugh.wav");
  backSound = loadSound("turbulence.mp3");
  coinCollectingSound = loadSound("coincollectingSound.mp3");
  fiSound = loadSound("fi.mp3");
  firSound = loadSound("flamestrike.mp3");
  gameOverSound = loadSound("gameOverSound1.wav");
  
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
  //to create the background
  wall = createSprite(windowWidth/2,windowHeight/2);
  wall.addImage(wall1Img);
  wall.scale = 4.6;
  wall.velocityX = -5;
  
  //to create the player
  player = createSprite(150,200);
  player.addImage(playerImg);
  player.scale = 0.6;
  
  //invisible block to make the player collide
  invisibleBlock = createSprite(windowWidth/2,0,900,300);
  invisibleBlock.visible = false;
  
  //to show the player to get ready
  getReady = createSprite(windowWidth/2,0);
  getReady.addImage(getReadyImg);
  
  //to show that the game is over
  gameOver = createSprite(windowWidth/2,windowHeight/2-100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  //to reset the game
  reset = createSprite(windowWidth/2,windowHeight/2);
  reset.addImage(resetImg);
  reset.visible = false;
  
  //to make the player touch the obstacle only when it is near it
  player.debug = false;
  player.setCollider("rectangle",15,35,200,180)
 
  //to make groups
  fireDragonG = new Group();
  monsterG = new Group();
  fireBallsG = new Group();
  dragonFireG = new Group();
  obstacleG = new Group();
  alienG = new Group();
  goldG = new Group();
  beeG = new Group();
  fiG = new Group();
  
  
}

function draw() {
  
background("pink");
  
  //to give a narration of the story
  if(gameState === serve){
    
    fill("black");
    textSize(30);
    text("You were a normal person uptil now",windowWidth/2-200,windowHeight/2-200);
    text("but now you have been summoned by the otherworld",windowWidth/2-350,windowHeight/2-150);
    text("to save the people of there country",windowWidth/2-200,windowHeight/2-100);
    text("and have been rewarded with the power to reproduce fire",windowWidth/2-360,windowHeight/2-50);
    text("You have to kill all the monsters appearing in that country",windowWidth/2-370,windowHeight/2);
    text("and save the people",windowWidth/2-100,windowHeight/2+50);
    text("you have only one life so be prepared",windowWidth/2-230,windowHeight/2+100);
    text("Press 'space' to start the game",windowWidth/2-170,windowHeight/2+150);
  }
  
  //to start the game
  if(keyDown("space")){
    
    gameState = PLAY;
    backSound.loop();
  }
  
  //functions to do in play state
  if(gameState === PLAY){
    
    //to make the player collide the invisible block
    player.collide(invisibleBlock);
  
    //to make an infinite path
  if(wall.x<windowWidth/2-150){
    
    wall.x = windowWidth/2+150;
  }
  
  //to make the player spawn fireballs
  if(mousePressedOver(player)){
    
    spawnFireBalls();
    firSound.play();
  }
  
    //to move the player freely
  player.x = mouseX;
  player.y = mouseY;
  
    //to increase the velocity of the path to make it more difficult
  if(score % 10 === 0){
    
    wall.velocityX = -(5+score/10)
  }
  
  
  
  //to show the player to get ready only for a particular time
  getReady.velocityY = 7;
  getReady.scale = 1.5;
  getReady.lifetime = 200;
    
    //to spawn gold on various positions
    if(frameCount % 20 === 0){
    
  gold = createSprite(windowWidth,Math.round(random(windowHeight/2-100,windowHeight-100)));
  gold.addImage(goldImg);
  gold.scale = 0.1;
  gold.velocityX = wall.velocityX;
  
    //to make the player's depth increase than the gold's
    player.depth = gold.depth;
    player.depth += 1;
    
    goldG.add(gold);
    
  }
  
  //to make player gain 1 gold
  if(player.isTouching(goldG)){
    
    goldG.destroyEach();
    g = g+1;
    coinCollectingSound.play();
    
  }
  
    //to make the score increase
  if(fireBallsG.isTouching(alienG)){
    
    alienG.destroyEach();
    fireBallsG.destroyEach();
    score = score+2
    alienSound.stop();
  }
  
  if(fireBallsG.isTouching(monsterG)){
    
    monsterG.destroyEach();
    fireBallsG.destroyEach();
    score = score+3
    monsterSound.stop();
  }
  
  if(fireBallsG.isTouching(fireDragonG)){
    
    fireDragonG.destroyEach();
    fireBallsG.destroyEach();
    score = score+5
    dragonSound.stop();
  }
  
  if(fireBallsG.isTouching(beeG)){
    
    beeG.destroyEach();
    fireBallsG.destroyEach();
    score = score+1;
  }
    
    //to collide the fireballs
    if(fireBallsG.isTouching(dragonFireG)){
      
      fireBallsG.destroyEach();
      dragonFireG.destroyEach();
      fi.visible = true;
      fi.velocityY = -7;
      fi.velocityX = 0;
      fi.lifetime = 3;
      fiSound.play();
    }
    
    //to end the game
    if(player.isTouching(dragonFireG)){
      
      gameState = END;
      gameOverSound.play();
    }
    
    if(player.isTouching(alienG)){
      
      gameState = END;
      gameOverSound.play();
    }
    
    if(player.isTouching(fireDragonG)){
      
      gameState = END;
      gameOverSound.play();
    }
    
    if(player.isTouching(beeG)){
      
      gameState = END;
      gameOverSound.play();
    }
    
    if(player.isTouching(obstacleG)){
      
      player.setVelocity(0,-9);
      gameState = END;
      gameOverSound.play();
    }
    
    if(player.isTouching(monsterG)){
      
      gameState = END;
      gameOverSound.play();
    }
  
  //to spawn the obstacles at intervals
  var select_obstacle = Math.round(random(1,5));
  
  if(frameCount % 60 === 0){
    
    if(select_obstacle === 1){
      
      spawnMonster();
    }else if(select_obstacle === 2){
      
      spawnAlien();
    }else if(select_obstacle === 3){
      
      spawnObstacle();
    }else if(select_obstacle === 4){
      
      spawnFireDragon();
      
    }else{
      
      spawnBee();
    }
  }
  
    //to change the background after a certain time
  if(frameCount % 180 == 0){
    
  var rand = Math.round(random(1,5));
  switch(rand){
      
    case 1:wall.addImage(wall2Img);
    break;
    
    case 2:wall.addImage(wall3Img);
    break;
    
    case 3:wall.addImage(wall4Img);
    break;
    
    case 4:wall.addImage(wall5Img);
    break;
    
    case 5:wall.addImage(wall1Img);
    break;
    
    default:break;
  }
    
  }
   
    drawSprites();
     //to show the score and no: of gold
  textSize(30);
  text("score:"+score,40,50);
  
  text("G:"+g,windowWidth-200,50)
  text("Press your mouse button to fire",windowWidth/2-150,30);
  }
  
  
 
 
  //stating the conditions in the end state
  if(gameState === END){
    
    
    
    wall.velocityX = 0;
    gameOver.visible = true;
    reset.visible = true;
    beeG.destroyEach();
    monsterG.destroyEach();
    dragonFireG.destroyEach();
    fireDragonG.destroyEach();
    alienG.destroyEach();
    obstacleG.destroyEach();
    fireBallsG.destroyEach();
    goldG.destroyEach();
    backSound.stop();
    dragonSound.stop();
    alienSound.stop();
    monsterSound.stop();
    fiSound.stop();
    player.y = 400;
    
    drawSprites();
    
    //if the game is reset
    if(mousePressedOver(reset)){
      
      gameState = PLAY;
      gameOver.visible = false;
      reset.visible = false;
      wall.velocityX = -3;
      score = 0;
      g = 0;
      gameOverSound.stop();
      backSound.loop();
    }
    
  }
  
}

//to spawn the monster
function spawnMonster(){
  
  var monster = createSprite(windowWidth,Math.round(random(windowHeight/2-50,windowHeight-100)),10,20);
  monster.velocityX = wall.velocityX;
  monster.addImage(monImg);
  monster.scale = 0.5;
  monster.lifetime = 500;
  
  monster.debug = false;
  monster.setCollider("circle",0,0,150)
  
  monsterSound.play();
  
  monsterG.add(monster);
    
}

//to spawn fireballs
function spawnFireBalls(){
  
  var fireBall = createSprite(200,300);
  fireBall.addImage(fireBallImg);
  fireBall.scale = 0.3;
  fireBall.x = player.x+20;
  fireBall.y = player.y;
  fireBall.velocityX = 4;
  fireBall.lifetime = 500;
  
  fireBall.debug = false;
  fireBall.setCollider("rectangle",150,150,120,160)
  
  player.depth = fireBall.depth;
  player.depth += 1;
  
  fireBallsG.add(fireBall);
}

//to spawn dragon with fire
  function spawnFireDragon(){
  
 var fireDragon = createSprite(windowWidth,windowHeight/2-150);
  fireDragon.addImage(monsterImg);
  fireDragon.velocityX = wall.velocityX;
  fireDragon.lifetime = 500;
  fireDragon.scale = 0.6;
  
  fireDragon.debug = false;
  fireDragon.setCollider("rectangle",0,0,360,200);
    
  
  dragonSound.play();
  
  fireDragonG.add(fireDragon);
   
  var dragonFire = createSprite(windowWidth,windowHeight/2-140);
  dragonFire.addImage(dragonFireImg);
  dragonFire.scale = 0.09;
  dragonFire.velocityX = wall.velocityX-3;  
  dragonFire.lifetime = 500;
    
   dragonFireG.add(dragonFire);
     
     fireDragon.depth = dragonFire.depth+1;
    
  fi = createSprite(windowWidth,windowHeight/2-140,2,2);
  fi.velocityX = wall.velocityX-3.5;
  fi.addImage(fiImg);
  fi.scale = 0.4;
  fi.visible = false;
    
    fiG.add(fi);

   }
    
    


//to spawn obstacle
function spawnObstacle(){
  
  var obstacle = createSprite(windowWidth,windowHeight-60);
  obstacle.addImage(obstacleImg);
  obstacle.scale = 1.4;
  obstacle.velocityX = wall.velocityX;
  obstacle.lifetime = 500;
  
  obstacleG.add(obstacle);
}

//to spawn alien
function spawnAlien(){
  
  var alien = createSprite(windowWidth,Math.round(random(windowHeight/2-50,windowHeight-100)));
  alien.addImage(alienImg);
  alien.velocityX = wall.velocityX;
  alien.scale = 0.3;
  alien.lifetime = 500;
  
  alien.debug = false;
  alien.setCollider("circle",0,0,150);
  
  alienSound.play();
  
  alienG.add(alien);
}

//to spawn bee
function spawnBee(){
  
 var bee = createSprite(windowWidth,Math.round(random(windowHeight/2-50,windowHeight-100)));
  bee.addImage(beeImg);
  bee.scale = 1.3;
  bee.velocityX = wall.velocityX;
  bee.lifetime = 500;
  
  bee.debug = false;
  bee.setCollider("circle",0,0,20);
  
  beeG.add(bee);
}
