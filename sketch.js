var bg, bgImg, bunny, blueberry;
var ground, groundImg;
var boxImg, blueberryImg, redberryImg;
var smallPimg, bigPimg;
var sadBunny, jumpingBunny, happyBunny;
var blueBerry1Group, blueBerry2Group, blueBerry3Group, blueBerry4Group, ground1Group, ground2Group, invisibleGround1Group, invisibleGround2Group, boxGroup, redBerry1Group, redBerry2Group;
var startImg, replayImg, gameOverImg;
var PLAY = 1;
var SERVE = 0;
var END = 2;
var gameState = SERVE;
var score = 0;
var life = 1;
var start;
var gameOver, replay;

function preload() {
  bgImg = loadImage("AutumnBg.jpg");
  boxImg = loadImage("package.png");
  blueberryImg = loadImage("HappyBlueBerry.png");
  redberryImg = loadImage("berryred.png");
  smallPimg = loadImage("SmallPlatform.png");
  bigPimg = loadImage("BigPlatform.png");
  sadBunny = loadImage("SadBunny.png");
  jumpingBunny = loadImage("JumpingBunny.png");
  happyBunny = loadImage("Bunny1.png");
  startImg = loadImage("start.png");
  replayImg = loadImage("ReplayButton.png");
  gameOverImg = loadImage("GameOver.png");

}

function setup() {
  createCanvas(displayWidth - 30, displayHeight - 200);

  bg = createSprite(displayWidth / 2, displayHeight / 2, displayWidth - 20, displayHeight - 30);
  bg.addImage(bgImg);
  bg.scale = 2.5;

  bunny = createSprite(displayWidth / 2, displayHeight / 2, 30, 30);
  bunny.addImage("happy", happyBunny);
  bunny.addImage("sad", sadBunny);
  bunny.addImage("jump", jumpingBunny);
  bunny.scale = 0.5;
  //bunny.debug = true;
  bunny.setCollider("rectangle", 0, 0, 80, 160)

  start = createSprite(displayWidth / 2, displayHeight / 2 + 100);
  start.addImage(startImg);

  gameOver = createSprite(displayWidth / 2, 0);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.25;

  replay = createSprite(displayWidth / 2, 0);
  replay.addImage(replayImg);

  gameOver.visible = false;
  replay.visible = false;

  boxGroup = new Group();
  blueBerry1Group = new Group();
  blueBerry2Group = new Group();
  blueBerry3Group = new Group();
  blueBerry4Group = new Group();
  ground1Group = new Group();
  ground2Group = new Group();
  invisibleGround1Group = new Group();
  invisibleGround2Group = new Group();
  redBerry1Group = new Group();
  redBerry2Group = new Group();

}

function draw() {
  background(220);

  if (gameState == SERVE) {
    if (keyDown('space')) {
      gameState = 1;
    }
    start.visible = true;
  } else if (gameState == PLAY) {

    start.visible = false;

    if (bunny.isTouching(boxGroup)) {
      life += 1;
      boxGroup.destroyEach();
    }

    if (bunny.isTouching(blueBerry1Group)) {
      score += 1;
      blueBerry1Group.destroyEach();
    }

    if (bunny.isTouching(blueBerry2Group)) {
      score += 1;
      blueBerry2Group.destroyEach();
    }

    if (bunny.isTouching(blueBerry3Group)) {
      score += 1;
      blueBerry3Group.destroyEach();
    }

    if (bunny.isTouching(blueBerry4Group)) {
      score += 1;
      blueBerry4Group.destroyEach();
    }

    if (bunny.isTouching(ground1Group)) {
      //bunny.collide(ground1Group);
      bunny.velocityX = 0;
      bunny.velocityY = 0;
      bunny.changeAnimation("happy", happyBunny);
    }

    if (bunny.isTouching(ground2Group)) {
      //bunny.collide(ground2Group);
      bunny.velocityX = 0;
      bunny.velocityY = 0;
      bunny.changeAnimation("happy", happyBunny);
    }

    if (bunny.isTouching(redBerry1Group)) {
      score -= 1;
      redBerry1Group.destroyEach();
    }

    if (bunny.isTouching(redBerry2Group)) {
      score -= 1;
      redBerry2Group.destroyEach();
    }

    if (bunny.isTouching(invisibleGround1Group) || bunny.isTouching(invisibleGround2Group)) {
      life -= 1;
      bunny.x = displayWidth / 2;
      bunny.y = displayWidth / 2;
    }

    if (bunny.x < 0 || bunny.y > displayHeight) {
      life -= 1
      bunny.x = displayWidth / 2;
      bunny.y = displayHeight / 2;
    }

    if (life == 0) {
      gameState = END;
    }

    if (keyDown("space") && bunny.y > 50) {
      bunny.velocityY = -12;
      bunny.changeAnimation("jump", jumpingBunny);
    }
    bunny.velocityY = bunny.velocityY + 0.5;

    var rand = Math.round(random(1, 2))
    if (frameCount % 100 == 0) {
      if (rand == 1) {
        spawnGround1();
      } else {
        spawnGround2();
      }
    }

    if (frameCount % 750 == 0) {
      spawnBox();
    }

  } else if (gameState == END) {

    start.visible = false;

    bunny.velocityX = 0;
    bunny.velocityY = 0;
    bunny.x = displayWidth / 2;
    bunny.y = displayHeight / 4 - 100;
    bunny.changeAnimation("sad", sadBunny);

    boxGroup.destroyEach();
    blueBerry1Group.destroyEach();
    blueBerry2Group.destroyEach();
    blueBerry3Group.destroyEach();
    blueBerry4Group.destroyEach();
    ground1Group.destroyEach();
    ground2Group.destroyEach();
    invisibleGround1Group.destroyEach();
    invisibleGround2Group.destroyEach();
    redBerry1Group.destroyEach();
    redBerry2Group.destroyEach();

    gameOver.visible = true;
    gameOver.y = bunny.y + 200;

    replay.visible = true;
    replay.y = gameOver.y + 220;

    if (mousePressedOver(replay)) {
      gameState = SERVE;
      replay.visible = false;
      gameOver.visible = false;
      bunny.changeAnimation("happy", happyBunny);
      score = 0;
      life = 1;
      bunny.y = displayHeight / 2;
    }

  }

  drawSprites();

  textSize(30);
  fill("white");
  text("Score: " + score, 100, 50);
  text("Life: " + life, 100, 90);
}

function reset() {
  gameState = SERVE;
  replay.visible = false;
  gameOver.visible = false;
  bunny.changeAnimation("happy", happyBunny);
}

function spawnGround1() {
  var ground = createSprite(displayWidth - 10, displayHeight / 2, 150, 10);
  ground.addImage(smallPimg);
  ground.scale = 0.5;
  ground.y = Math.round(random(300, height - 100));
  ground.velocityX = -3;
  //ground.debug = true;
  ground.setCollider("rectangle", 0, 0, 320, 100)
  ground1Group.add(ground);

  var fruit = createSprite(ground.x + 20, ground.y - 45, 15, 15);
  fruit.velocityX = -3
  fruit.addImage(blueberryImg);
  fruit.scale = 0.05;
  //fruit.debug = true;

  var rand = Math.round(random(1, 4));

  switch (rand) {
    case 1:
      blueBerry1Group.add(fruit);
      break;

    case 2:
      blueBerry2Group.add(fruit);
      break;

    case 3:
      blueBerry3Group.add(fruit);
      break;

    case 4:
      blueBerry4Group.add(fruit);
      break;
  }

  if (rand == 1) {
    redBerries(fruit.x - 50, fruit.y);

  }

  var invisibleGround = createSprite(ground.x, ground.y + 20, 150, 10);
  invisibleGround.velocityX = -3
  invisibleGround.visible = false;
  invisibleGround1Group.add(invisibleGround);
  //invisibleGround.debug = true;
}

function spawnGround2() {
  var ground = createSprite(displayWidth - 10, displayHeight / 2, 250, 10);
  ground.addImage(bigPimg);
  ground.scale = 1;
  ground.y = Math.round(random(100, height - 300));
  ground.velocityX = -3;
  //ground.debug = true;
  ground.setCollider("rectangle", 0, 0, 160, 50)
  ground2Group.add(ground);

  var fruit1 = createSprite(ground.x, ground.y - 10, 15, 15);
  fruit1.addImage(blueberryImg);
  fruit1.scale = 0.05;
  fruit1.velocityX = -3
  //fruit1.debug = true;
  blueBerry2Group.add(fruit1);

  var fruit2 = createSprite(ground.x + 50, ground.y - 10, 15, 15);
  fruit2.addImage(blueberryImg);
  fruit2.scale = 0.05;
  fruit2.velocityX = -3
  //fruit2.debug = true
  blueBerry2Group.add(fruit2);

  var rand = Math.round(random(1, 3));
  var rand1 = Math.round(random(1, 4));
  var rand2 = Math.round(random(1, 4));

  switch (rand1) {
    case 1:
      blueBerry1Group.add(fruit1);
      break;

    case 2:
      blueBerry2Group.add(fruit1);
      break;

    case 3:
      blueBerry3Group.add(fruit1);
      break;

    case 4:
      blueBerry4Group.add(fruit1);
      break;
  }

  switch (rand2) {
    case 1:
      blueBerry1Group.add(fruit2);
      break;

    case 2:
      blueBerry2Group.add(fruit2);
      break;

    case 3:
      blueBerry3Group.add(fruit2);
      break;

    case 4:
      blueBerry4Group.add(fruit2);
      break;
  }

  if (rand == 1) {
    redBerries(fruit1.x - 50, fruit1.y);

  }

  var invisibleGround = createSprite(ground.x, ground.y + 40, 150, 10);
  invisibleGround.velocityX = -3
  invisibleGround.visible = false;
  //invisibleGround.debug = true;
  invisibleGround2Group.add(invisibleGround);
}

function spawnBox() {
  var box = createSprite(displayWidth, Math.round(random(100, width - 500)), 10, 10);
  box.addImage(boxImg);
  box.scale = 0.2;
  box.velocityX = -2;
  boxGroup.add(box);
}

function redBerries(x, y) {
  var redBerry = createSprite(x, y, 10, 10);
  redBerry.addImage(redberryImg);
  redBerry.scale = 0.2;
  redBerry.velocityX = -3;
  //redBerry.debug = true;
  redBerry.setCollider("circle", 0, 0, 80)
  redBerry1Group.add(redBerry);
}