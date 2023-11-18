title = "BLOCK DODGER";

description = `Tap:toggle dir.\nHold:jump/stop`;

characters = [
  `
  llll
  ll
  llll
  llll
  l  l
  `,
  `
  llll
    ll
  llll
  llll
  l  l
  `,
  
];


options = {};

let player;
let c;
let targets;
let target1;
let dropSpeed;

let sweeper;
let sweeperSpeed;

let timer;
let speedTimer;

function update() {
  if (!ticks) { // start
    timer = 0;
    speedTimer = 0;
    player = {
      xPos: 20,
      yPos: 80,
      goLeft: false,
      move: true,
      jumping: false,
    }
    target1 = {
      xPos: 60,
      yPos: 30,
      width: 10,
      height: 10
    }
    console.log(target1);

    targets = [];
    targets.push({ // target 0
      box: {
      xPos: 30,
      yPos: 50,
      width: 10,
      height: 10
    }, 
    shrink: false
    });
    targets.push({box: target1, shrink: false}); // target 1

    // targets.push({ // target
    //   box: {
    //   xPos: 80,
    //   yPos: 80,
    //   width: 14,
    //   height: 14
    // }, 
    // shrink: true
    // });
    dropSpeed = 0.25;

    sweeper = {
      xPos: 60,
      yPos: 80,
      width: 10,
      height: 8,
      goLeft: false,
    }
    sweeperSpeed = 0.5;
  }

  speedTimer++;
  if(speedTimer > 100){
    dropSpeed += 0.1;
    sweeperSpeed += 0.01;
    speedTimer = 0;
  }
  // ground
  color("yellow");
  box(0,92,200,17);
  
  // targets
  color("black");
  for (let i = 0; i < targets.length; i++){
    if(i == 0 && targets[0].box.width < 13){
      color("blue");
    } else {
      color("blue");
    }
    // reduce y
    targets[i].box.yPos+= dropSpeed;
    if(targets[i].box.yPos >= 80){
      targets[i].box.yPos = 0;
      targets[i].box.xPos = Math.floor(Math.random() * 100);
      addScore(1);
    }

    box(targets[i].box.xPos,targets[i].box.yPos,targets[i].box.width,targets[i].box.height);
    if(targets[i].shrink){
      targets[i].box.width-= 0.5;
      targets[i].box.height-= 0.5;
      if(targets[i].box.width < 10){
        targets[i].shrink = false;
      }
    } else {
      targets[i].box.width+= 0.5;
      targets[i].box.height+= 0.5;
      if(targets[i].box.width > 20){
        targets[i].shrink = true;
      }
    }
  }


  // sweeper

  if(sweeper.goLeft){
    if(sweeper.xPos > 1){
      sweeper.xPos-= sweeperSpeed;
    } else {
      sweeper.goLeft = !sweeper.goLeft;
    }

  } else {
    if(sweeper.xPos < 90){
      sweeper.xPos+= sweeperSpeed;
    } else {
      sweeper.goLeft = !sweeper.goLeft;
    }
  }
  box(sweeper.xPos, sweeper.yPos, sweeper.width, sweeper.height);
  
  
  // input
  color("red");
  player.move = true;

  if(input.isPressed){
    timer++;
    player.move = false;
    //console.log("current time held:" + timer);

    if (timer > 10 )
      color("green");
  }
  if(input.isJustReleased){
    console.log("total time:" + timer);

    // select control

    // ( quick press)
    if(timer < 10){ // turn
      player.goLeft = !player.goLeft;
    }

    // ( long press)
    if (timer > 10 ){
      player.move = false;
      if(player.yPos >= 80)
        player.jumping = true;
    }

    timer = 0;
  }

  if(player.goLeft){
      c = char("b", player.xPos,player.yPos).isColliding;
    if(player.xPos > 10 && player.move)
    player.xPos-= 0.5;
  } else {
    c = char("a", player.xPos,player.yPos).isColliding;
    if(player.xPos < 90 && player.move)
    player.xPos+= 0.5;
  }

  if(player.jumping){
    if(player.yPos > 60)
    player.yPos-=0.5;
    else {
      player.jumping = false;
    }
  } else {
    if(player.yPos < 80)
    player.yPos+=0.25;
  }

  // check collisions
  if (c.rect.blue){
    console.log("hit");
    rewind();
  }


}
