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
import { CANVAS, CTX, MS_PER_FRAME, KEYS, FLOOR } from "./globals.js";

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
let groundWidth = 2300/10;
let ground = new Image();
ground.src = "../images/dino_large.png";
// in px per millisecond
let ground_speed = 5;
const groundAssetsShown = [];
// in milliseconds
let GTimer = 200/ground_speed;
class GroundSegemnt{
  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {Array[image,cx,cy,cw,ch,px,py,pw,ph]} img 
   */
  constructor(x,y,img){
    this.x = x;
    this.y = y;
    this.image = img;
  }

  Move(speed){
    this.x -= speed;
    CTX.drawImage(ground,0,102,200,28,this.x,300,200,28);
    //CTX.drawImage(this.image[0],this.image[1],this.image[2],this.image[3],this.image[4],this.image[5],this.image[6],this.image[7],this.image[8]);
  }

}
groundAssetsShown.push(new GroundSegemnt(2300,0,[ground.src,0,102,200,28,0,300,200,28]))

// Event Listeners
document.addEventListener("keydown", keypress);
document.addEventListener("keyup", keylift);


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
  GTimer--;
  if (GTimer<0){
    groundAssetsShown.push(new GroundSegemnt(1080,0,[ground,0,102,200,28,0,300,200,28]))
    GTimer = (200/ground_speed)-ground_speed;
  }
  console.log(GTimer);
  CTX.drawImage(ground,0,102,200,28,0,300,200,28);

  groundAssetsShown.map((x)=>x.Move((ground_speed)));

  // Draw our hero
  HERO.update();
  
}

// Start the animation
update()
