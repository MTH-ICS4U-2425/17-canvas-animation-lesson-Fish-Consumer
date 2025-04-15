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
import { CANVAS, CTX, MS_PER_FRAME, KEYS, FLOOR,randInt } from "./globals.js";

// Globals
const HERO = new Player(20, 50, 48, 48);
let frame_time = performance.now()
let KeysDown = {
  /**
   * check if a key is presed (input is the keys "keyCode" value)
  */
 isPressed: new Array(100).fill(false),
}
// code for ground tiles
let ground = new Image();
ground.src = "../images/dino_large.png";
// in px per millisecond
let ground_speed = 5;
const groundAssetsShown = [];

/* cactus variables*/
const CactusArray = [];
//small cacti have a px difference of 34 ()
const CactusImageCo_ordinates = [ [446,2,34,70],[480,2,68,70],[514,2,102,70]

]
// in milliseconds
let CactusTimer = 500;
class GroundSegemnt{
  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {Array[image,cx,cy,cw,ch,px,py,pw,ph]} img 
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
      CTX.drawImage(ground,this.SpImDi[0],this.SpImDi[1],this.SpImDi[2],this.SpImDi[3],this.x,this.FLOOR-this.SpImDi[2],this.SpImDi[2],this.SpImDi[3]);
    } else {
      CTX.drawImage(ground,this.SpImDi*200,102,200,28,this.x,300,200,28);
    }
    if (this.x<=-200){
      if (this.isCactus&&CactusTimer<=0){
        CactusTimer = randInt(7,11)*100;
        this.SpImDi = CactusImageCo_ordinates[randInt(0,2)];
        this.x = Math.floor((CANVAS.width+200)/200)*200;
      } else if (!this.isCactus) {
        this.SpImDi = randInt(0,11);
        this.x = Math.floor((CANVAS.width+200)/200)*200;
      }
      
      
    }
  }

}

// Event Listeners
document.addEventListener("keydown", keypress);
document.addEventListener("keyup", keylift);


for (let i = 0; i-2<Math.floor(CANVAS.width/200);i++){
  groundAssetsShown.push(new GroundSegemnt(i*200,0,1));
}
for (let i = 0; i <= 3;i++){
  CactusArray.push(new GroundSegemnt(CANVAS.width-
    ((i+1)*100*randInt(6,9)),0,0,true));
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

  if (KeysDown.isPressed[KEYS.SPACE]||KeysDown.isPressed[KEYS.UP_ARROW]){
    HERO.Jump();
  }
  if (KeysDown.isPressed[KEYS.LEFT_ARROW]){
    HERO.Move(-1);
  }
  if (KeysDown.isPressed[KEYS.RIGHT_ARROW]){
    HERO.Move(1);
  }
  CactusTimer -= EXCESS_TIME;
  // Clear the canvas
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  
  // Draw ground (and cacti)
  CTX.drawImage(ground,446,2,34,70,50,50,34,70);
  groundAssetsShown.map((x)=>x.Move(ground_speed));
  CactusArray.map((x)=>x.Move(ground_speed))

  // Draw our hero
  HERO.update();
  
}

// Start the animation
update()
