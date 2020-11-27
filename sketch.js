var pokemon,pokemon_image;
var ground;
var obstacle,obstacle_image;
var fruit,fruit_image;
var obstacleGroup;
var fruitGroup;
var pokemonbackground;
var poke;
var score=0;
var survivalTime=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var restart;
var restart_image;

function preload(){
  pokemon_image=loadImage("pokemon.png");
  obstacle_image=loadImage("obstacle.png");
  fruit_image=loadImage("banana.png");
  poke=loadImage("new bg.jpg");
  restart_image=loadImage("restart.png")
 }

function setup() {
createCanvas(600,600) ;
  fruitGroup=createGroup()
  obstacleGroup=createGroup()
  pokemonbackground=createSprite (300,0,20,20)
  pokemonbackground.addImage(poke)
  pokemonbackground.scale=1;
  pokemon= createSprite(50,200,20, 20)
  pokemon.addImage(pokemon_image);
  pokemon.scale=0.1;
 }

function draw() {
  background("123")
 
  ground= createSprite(60,320,1000,10)   
  ground.visible=false
  pokemonbackground.velocityX=-3
  pokemon.collide(ground)
 
  if(pokemonbackground.x<0){
    pokemonbackground.x=pokemonbackground.width/2
  }

if(gameState===PLAY){
 if(keyDown("space")&& pokemon.y>=100){
    pokemon.velocityY=-17
 }
    pokemon.velocityY = pokemon.velocityY + 0.8
    fruit1()
    obstacle1()
    if(fruitGroup.isTouching(pokemon)){
    score=score+2
    fruitGroup.destroyEach()
}
    if(obstacleGroup.isTouching(pokemon)){
    pokemon.scale=0.1
    restart=createSprite(300,125,20,20)   
    restart.addImage(restart_image)  
    restart.scale=0.05
    gameState=END;
}
   
}
 
  drawSprites()
  fill("red")
  textSize(15)
  stroke("yellow")
  text("score:"+ score,470,45)
  fill("green")
  textSize(15)
  stroke("red")
  survivalTime=survivalTime+Math.ceil(frameRate()/60)
  text("survivalTime"+ survivalTime,420,20)
 
  if(gameState===END){
  obstacleGroup.setVelocityXEach(0);
  fruitGroup.setVelocityXEach(0);  
  pokemonbackground.velocityX=0;
  pokemon.velocityX=0;
  score=0;
  obstacleGroup.setLifetimeEach(-1);
  fruitGroup.setLifetimeEach(-1);
  survivalTime=0;
  textSize(50)
  text("GAMEOVER",150,100)  
}
  if(mousePressedOver(restart)) {
      reset();
    }
   switch(score){
  case 10 : pokemon.scale=0.12
            break;
  case 20 : pokemon.scale=0.14
            break;
  case 30: pokemon.scale=0.16
            break;
  case 40 : pokemon.scale=0.18
            break;
       
       default:break;
}
}

function fruit1(){
  if(frameCount % 80===0){
    fruit= createSprite(600,250,20,20)
    fruit.y=Math.round(random(150,200))  
    fruit .addImage(fruit_image)
    fruit.scale=0.1
    fruit.velocityX=-4
    fruit.lifetime= 200
    fruitGroup.add(fruit)
 }
}
function obstacle1(){
  if(frameCount%80===0){
    obstacle=createSprite(600,600,20,20);
    obstacle.y=Math.round(random(295,295));
    obstacle.addImage(obstacle_image);
    obstacle.scale=0.1;
    obstacle.velocityX=-3;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
  gameState=PLAY;
 //ameOver.visible=false;
 //estart.visible=false;
  restart.visible=false;
obstacleGroup.destroyEach();
 fruitGroup.destroyEach()  ;
  survivalTime=0;
  score=0;
}


