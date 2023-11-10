var bkImg,space;
var asteroid
var score=0
var life=3
var shootSound
var sadSound
var g1
var dieImg
var earthGroup

function preload(){
bkImg=loadImage("assets/bg.jpg");
spaceImg=loadAnimation("assets/i1.png","assets/i2.png","assets/i3.png","assets/i4.png","assets/i5.png","assets/i6.png","assets/i7.png")
a1Img=loadImage("assets/a1.png")
a2Img=loadImage("assets/a2.png")
a3Img=loadImage("assets/a3.png")
a4Img=loadImage("assets/a4.png")
laserImg=loadImage("assets/laser.png")
blastImg=loadImage("assets/blast.png")
gameOverImg=loadImage("assets/gameOver.png")
shootSound=loadSound("assets/shoot.mp3")
sadSound=loadSound("assets/sad.mp3")
resetImg=loadImage("assets/restart.png")
dieImg=loadImage("assets/i1.png")
earthImg=loadImage("assets/earth.png")
}

function setup(){
createCanvas(1280,675);
space=createSprite(660,600,20,20);
space.addAnimation("space",spaceImg)
space.scale=0.3

earthGroup=new Group()
asteroidGroup=new Group()
laserGroup=new Group()

scoreBoard=createElement("h1")
lifeBoard=createElement("h1")

space.setCollider("rectangle",0,0,120,350)
g1=createSprite(650,320,20,20)
 g1.addImage(gameOverImg)
 g1.visible=false

r1=createSprite(640,390,20,20)
r1.addImage("restart",resetImg)
r1.scale=0.1
r1.visible=false
}

function draw(){
background(bkImg);
textSize (45)
fill ("lightblue")
text ("Space Shooter",460,50)
scoreBoard.html("Score: "+score)
scoreBoard.style('color:green')
scoreBoard.position(900,20)

lifeBoard.html("Life: "+life)
lifeBoard.style('color:red')
lifeBoard.position(1100,20)

if(keyDown("left_arrow") && space.x>=100){
    space.x=space.x-15
}
if(keyDown("right_arrow") && space.x<=1200){
    space.x=space.x+15
}

if(keyDown("up_arrow")){
    shootSound.play()
    spawnLaser()
}

if(asteroidGroup.collide(laserGroup)){
    handleCollision(asteroidGroup)
    score+=1
}
if(earthGroup.collide(space)){
    score=score+10
    earthGroup.destroyEach()
}
if(earthGroup.collide(laserGroup)){
    score=score-10
    earthGroup.destroyEach()
}
if(asteroidGroup.collide(space)){
    life=life-1
    asteroidGroup.destroyEach()
}
if(life===0){
    g1.visible=true
    r1.visible=true
    asteroidGroup.destroyEach()
    if(mousePressedOver(r1)){
        reset()
    }
}
spawnAstroids()
spawnEarth()
drawSprites()
}
function reset(){
sadSound.play()
life=3
score=0
g1.visible=false
r1.visible=false
}

function spawnAstroids(){
    if(frameCount%40===0){
        asteroid=createSprite(random(10,1000),100,20,20)
        asteroid.velocityY=(8.5+score/10)
        asteroid.scale=0.2
        var r1=Math.round(random(1,4))
        switch(r1){
            case 1:asteroid.addImage(a1Img)
            break
            case 2:asteroid.addImage(a2Img)
            break
            case 3:asteroid.addImage(a3Img)
            break
            case 4:asteroid.addImage(a4Img)
            break

        }
        asteroid.lifetime=60
        asteroidGroup.add(asteroid)
    }
}

function spawnLaser (){
    laser=createSprite(space.x,510,20,20)
    laser.addImage(laserImg)
    laser.velocityY=-5
    laser.scale=0.2
    laserGroup.add(laser)
}
 
function handleCollision(asteroidGroup){
blast=createSprite(laser.x+30,laser.y,20,20)
blast.addImage(blastImg)
blast.scale=0.1
blast.lifetime=30
asteroidGroup.destroyEach()
laserGroup.destroyEach()
}

function spawnEarth(){
    if(frameCount%340===0){
    earth=createSprite(random(10,1270),20,10,10)
earth.addImage(earthImg)
earth.velocityY=(8.5+score/10)
earth.scale=0.1
earthGroup.add(earth)
}}