const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;

var bg = "sprites/bg.png";


function preload() {
   //call the getBackgroundimagefunction
   getBackgroundimage();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world; 

    ground = new Ground(600,height,1200,20);
    console.log(ground);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
    background(backgroundImg);
    }
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshot.fly();
}
function keyPressed(){
    if(keyCode===32)
    slingshot.attach(bird.body);
}

//JSON - Javascipt object oriented notation - {key:value}

//API - application programming interface

async function getBackgroundimage(){
//call an api
var response = await fetch("https://worldtimeapi.org/api/timezone/Europe/Rome") ;

//convert the info into json
var responseJSON = await response.json();
console.log(responseJSON);

//extract the required information
var mydate = responseJSON.datetime;
console.log(mydate);
var hour = mydate.slice(11,13)//00 - 24 - 6am to 17hours - daytime and 17 hours to 6am - night
console.log(hour);//19 , 05.

//if hour is between 6am to 17hours  then load day bckg
//else load night background
if(hour>=06 & hour<=17){
    bg = "sprites/bg.png";
}
else {
    bg = "sprites/bg2.jpg";
}
backgroundImg=loadImage(bg);


}