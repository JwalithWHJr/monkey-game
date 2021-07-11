var bananaImage, obstacleImage, backImage;
var monkey , monkey_running;
var ground, banana, obstacle;
var FoodGroup, obstacleGroup;
var score, survivalTime;
  

function preload(){
 monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  backImage = loadImage("jungle.jpg");
 }



function setup() {
  createCanvas(600, 600);
  
  scene = createSprite(200,200,400,400);
  scene.addImage(backImage);
  scene.x = scene.width/2;
  scene.velocityX = -6;
  
  survivalTime=0;
  
  //creating monkey
   monkey=createSprite(40,360,10,10);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.10;
  
  ground = createSprite(400,400,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible = false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  survivalTime=0;
 }


function draw() {
  
  background(255);
  
  monkey.collide(ground);
  
  
  if(scene.x<0) {
    scene.x = scene.width/2;
  }
  
  if(ground.x<0) {
    ground.x = ground.width/2;
  }
     
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
  if(FoodGroup.isTouching(monkey)){
    score = score+2
    FoodGroup.destroyEach();
  }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
  
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 10,50);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
        scene.velocityX = 0;
        monkey.velocityY = 0;
      
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
      
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 430,50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.10;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,370,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
