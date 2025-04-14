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
const CactusArray = [];
// code for ground tiles
let ground = new Image();
ground.src = "../images/dino_large.png";
// in px per millisecond
let ground_speed = 5;
const groundAssetsShown = [];
// in milliseconds
let GTimer = 5;
class GroundSegemnt{
  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {Array[image,cx,cy,cw,ch,px,py,pw,ph]} img 
   */
  constructor(x,y,GID,specificImageDimensions = [102,200,280,300,200,28],isCactus = false){
    this.x = x;
    this.y = y;
    this.groundSection = GID;
    this.SpImDi = specificImageDimensions;
    this.isCactus = isCactus;
  }

  Move(speed){
    if (!this.isCactus){
      console.log(this.SpImDi[0]);
    }
    this.x -= speed;
    if (this.isCactus){
      CTX.drawImage(ground,455,this.SpImDi[0],this.SpImDi[1],this.SpImDi[2],this.x,this.SpImDi[3],this.SpImDi[4],this.SpImDi[5]);
    } else {
      CTX.drawImage(ground,this.groundSection*200,102,200,280,this.x,300,200,28);
    }
    if (this.x<=-200){
      if (this.isCactus){

      } else {
        
        this.groundSection = randInt(0,11);
      }
      this.x = Math.floor((CANVAS.width+200)/200)*200;
      
    }
  }

}

// Event Listeners
document.addEventListener("keydown", keypress);
document.addEventListener("keyup", keylift);


for (let i = 0; i-2<Math.floor(CANVAS.width/200);i++){
  groundAssetsShown.push(new GroundSegemnt(i*200,0,1));
}
for (let i = 0; i <= 5;i++){
  CactusArray.push(new GroundSegemnt(CANVAS.width,0,i,[2,34,70,50,34,70],true))
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

  // Clear the canvas
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  
  // Draw ground
  CTX.drawImage(ground,446,2,34,70,50,50,34,70);
  CactusArray.map((x)=>x.Move(ground_speed))
  groundAssetsShown.map((x)=>x.Move(ground_speed));

  // Draw our hero
  HERO.update();
  
}

// Start the animation
update()
