var database;
var bg;
var Spaceship,ship_Img;
var asteroid,asteroid_Img;
var shooter,shooter_Img;
var Sprite;
var x = 200;
var y = 100;
var score = 0;
var asGroup, shGroup;
var start,startImg;

function preload(){
  bg = loadImage("Images/Space.png");
  ship_Img = loadImage("Images/SpaceShip.png");
  asteroid_Img = loadImage("Images/Asteroid.png");
  shooter_Img = loadImage("Images/Shooter1.png");
}

function setup(){
  createCanvas(800,550);
  database = firebase.database();

  Spaceship = createSprite(400,450);
  Spaceship.addImage(ship_Img);
  Spaceship.scale = 0.2;

  asGroup = new Group();
  shGroup = new Group();

}

function draw(){
  background(bg);

  Spaceship.x = mouseX;

  if(mousePressedOver(Spaceship)){
    createShooter();
  }

  edges = createEdgeSprites();
  Spaceship.bounceOff(edges);

  if(frameCount%60===0){
    asteroid = createSprite(10,10,10,10);
    asteroid.addImage(asteroid_Img);
    asteroid.x = Math.round(random(10,600));
    asteroid.scale = (random(0.05,0.2));
    asteroid.velocityY = 2;
    asGroup.add(asteroid);
  }

  if(shGroup.isTouching(asGroup)){
    asGroup.destroyEach();
    shGroup.destroyEach();
    score=score+1;
  }

  drawSprites();
  fill("White");
  textSize(20)
  text("Score : "+score,680,50);
}

function createShooter(){
  shooter = createSprite(0,390,5,10);
  shooter.velocityY = -2;
  shooter.x = Spaceship.x;
  shooter.addImage(shooter_Img);
  shooter.scale = 0.09;
  shGroup.add(shooter);
  return shooter;
}
