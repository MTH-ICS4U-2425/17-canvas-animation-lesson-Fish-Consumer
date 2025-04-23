/**
 * ICS4U - Mr. Brash 🐿️
 * 
 * 17 - Canvas Animation
 * 
 * Author:
 * 
 */

'use strict';

import Player from "./player.js";
import { CANVAS, CTX, MS_PER_FRAME, KEYS, FLOOR,randInt,ground,debugMode } from "./globals.js";

let score = 0;
// Globals
const HERO = new Player(20, 50, 48, 48, 0.7, 0.8);
HERO.update();

let frame_time = performance.now()
let KeysDown = {
  /**
   * check if a key is presed (input is the keys "keyCode" value)
  */
 isPressed: new Array(100).fill(false),
}
let gameState = 3;
// in px per millisecond
let ground_speed = 5;
let groundAssetsShown = [];
//in frames
let CactusTimer = 70;
/* cactus variables*/
let CactusArray = [];
/**
 * ID[0] = X co-ordinate on image sheet
 * ID[1] = Y co-ordinate on image sheet
 * ID[2] = Width on image sheet
 * ID[3] = Hieght on image sheet
 * 
 * Note: small cacti have a px difference of 34 (50px for large)
 */
const CactusImageCo_ordinates = [ [446,2,34,70],[480,2,68,70],[514,2,102,70],[652,2,50,99],[702,2,100,99],[802,2,150,99]]

class GroundSegemnt{
  // how many px to take off the hitboxes of the cacti
  catHitShave = [10,10];
   /**
    * 
    * @param {number} x 
    * @param {number} y 
    * @param {Int} GID 
    */
   constructor(x,y,GID,isCactus = false){
     this.x = x;
     this.y = y;
     this.isCactus = isCactus;
     if (isCactus){
       this.SpImDi = CactusImageCo_ordinates[GID];
     } else {
       this.SpImDi = GID;
     }
   }
 
   Move(speed){
     this.x -= speed;
     if (this.isCactus){
      if (debugMode) CTX.fillRect(this.x+this.catHitShave[0],FLOOR-this.SpImDi[3]+this.catHitShave[1],this.SpImDi[2]-(this.catHitShave[0]*2),this.SpImDi[3]-(this.catHitShave[1]*2));
      this.y = FLOOR-this.SpImDi[3];
       CTX.drawImage(ground,this.SpImDi[0],this.SpImDi[1],this.SpImDi[2],this.SpImDi[3],this.x,this.y,this.SpImDi[2],this.SpImDi[3]);
     } else { 
       CTX.drawImage(ground,this.SpImDi*200,102,200,28,this.x,300,200,28);
     }
     if (this.x<=-200){
       if (this.isCactus&&CactusTimer<=0){
         CactusTimer = randInt(4,6)*20;
         this.SpImDi = CactusImageCo_ordinates[randInt(0,5)];
         this.x = Math.floor((CANVAS.width+200)/200)*200;
       } else if (!this.isCactus) {
         this.SpImDi = randInt(0,11);
         this.x = Math.floor((CANVAS.width+200)/200)*200;
       }
       
       
     }
   }
   // to check if this cacti is colliding with the object inputted 
   cactiHitboxColliding(Hitbox_X, Hitbox_Y, Hitbox_Width, Hitbox_Height){
    if (Math.abs(Hitbox_X-(this.x+(this.SpImDi[2]/2)))<(Hitbox_Width+this.SpImDi[2]-this.catHitShave[0])/2&&Math.abs(Hitbox_Y-(this.y+(this.SpImDi[3]/2)))<(Hitbox_Height+this.SpImDi[3]-this.catHitShave[1])/2) {
      gameState = 1;
    }
   }
 }

// Event Listeners
document.addEventListener("keydown", keypress);
document.addEventListener("keyup", keylift);

// a draw line function
function drawLines(LineCO){
  CTX.beginPath;
  CTX.moveTo(LineCO[0][0],LineCO[0][1]);
  for (let i of LineCO){
    CTX.lineTo(i[0],i[1]);
  }
  CTX.stroke();
}


// Disable the context menu on the entire document
document.addEventListener("contextmenu", (event) => { 
  event.preventDefault();
  return false; 
});

/**
 * The user pressed a key on the keyboard 
 */
function keypress(event) {
  KeysDown.isPressed[event.keyCode] = true;
}

/**
 * The key on the keyboard is no longer pressed down 
 */
function keylift(event) {
  KeysDown.isPressed[event.keyCode] = false;
}

/**
 * 
 */
function reset(){
  score = 0;
  groundAssetsShown = [];
  CactusArray = [];
  for (let i = 0; i-2<Math.floor(CANVAS.width/200);i++){
    groundAssetsShown.push(new GroundSegemnt(i*200,0,1));
  }
  for (let i = 0; i <= 3;i++){
    CactusArray.push(new GroundSegemnt(CANVAS.width-
      ((i+3)*100*randInt(6,9)),0,0,true));
  }
  HERO.position.x = 50;
  HERO.position.y = FLOOR-HERO.DinoImageFrame[0][3];
  gameState = 2;
  HERO.velocity.x = 0;
  HERO.velocity.y = 0;
}

/**
 * The main game loop
 */
function update() {
  // Prepare for the next frame
  requestAnimationFrame(update)
  
  /*** Desired FPS Trap ***/
  const NOW = performance.now()
  const TIME_PASSED = NOW - frame_time
  if (TIME_PASSED < MS_PER_FRAME) return
  
  const EXCESS_TIME = TIME_PASSED % MS_PER_FRAME
  frame_time = NOW - EXCESS_TIME
  /*** END FPS Trap ***/
  if (gameState==2){
  if (KeysDown.isPressed[KEYS.SPACE]||KeysDown.isPressed[KEYS.UP_ARROW]){
    HERO.Jump(21);
  }
  if (KeysDown.isPressed[KEYS.LEFT_ARROW]){
    HERO.Move(-1);
  }
  if (KeysDown.isPressed[KEYS.RIGHT_ARROW]){
    HERO.Move(1);
  }
  if (KeysDown.isPressed[KEYS.DOWN_ARROW]){
    HERO.Duck(true);
  } else {
    HERO.Duck(false)
  }
  CactusTimer--;
  score++;
  console.log(score)
  // Clear the canvas
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

  // Draw ground (and cacti)
  groundAssetsShown.map((x)=>x.Move(ground_speed));
  CactusArray.map((x)=>x.Move(ground_speed))
  // Draw our hero
  HERO.update();
  
  // is colliding with player?
  CactusArray.map((x)=>x.cactiHitboxColliding(HERO.position.x+(HERO.width/2),HERO.position.y+(HERO.height/2),HERO.width*HERO.boxWidth,HERO.height*HERO.boxHeight));
  } else if(gameState==1){
    if (!KeysDown.isPressed[KEYS.SPACE]) gameState=0;
  } else if (gameState==3){
    CTX.drawImage(ground,446,2,34,70,50,50,34,70);
    if (KeysDown.isPressed[KEYS.SPACE]) reset();
  }else {
    // the splash screen
    if (KeysDown.isPressed[KEYS.SPACE]) reset();
  }
}

// Start the animation
update()
