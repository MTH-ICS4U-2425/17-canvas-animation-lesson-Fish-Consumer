/**
 * player.js
 * 
 * The Player Class
 * 
 * Acts as a sprite or "hero" for the game
 * 
 * Author: 
 */

import { CTX, CANVAS, GRAVITY, FLOOR, KEYS, ground, debugMode } from "./globals.js"

export default class Player {
  isDucking = false;
  animationFrame = 0;
  // in frames
  groundedAnimationTimer = 0;
  /**
   * 
   * @param {*} x 
   * @param {*} y 
   * @param {*} width 
   * @param {*} height 
   * @param {*} hitBoxWidthSize 
   * @param {float} hitBoxHeightSize a multiplier of how large the hitbox should be compared to the actual width/height
   */
  constructor(x, y, width, height, hitBoxWidthSize = 1, hitBoxHeightSize = 1) {
    this.width = width;
    this.height = height;
    this.boxWidth = hitBoxWidthSize;
    this.boxHeight = hitBoxHeightSize;

    this.position = {
      x: x,
      y: y
    }
    this.velocity = {
      x: 0,
      max_X: 6,
      y: 0,
      max_Y: -100,
      X_deceleration: 0.89
    };
  }



  /**
   * Main function to update location, velocity, and image
   */
  update() {
    this.draw();
    // console.log(this.velocity.y);
    this.position.x += this.velocity.x;

    if (this.position.y - this.velocity.y >= FLOOR-this.height){
      this.position.y = FLOOR-this.height;
      this.velocity.y = 0;

    } else {
      if (this.velocity.y > this.velocity.max_Y){
        if (this.isDucking){
          this.velocity.y -= GRAVITY*3;
        } else {
          this.velocity.y -= GRAVITY;
        }
      } else {this.velocity.y = this.velocity.max_Y}
      this.position.y -= this.velocity.y;
    }

    if (this.position.x+this.velocity.x<=0){
      this.position.x = 1;
      this.velocity.x = 0;
    } else if (this.position.x+this.velocity.x>=CANVAS.width-86){
      this.position.x = CANVAS.width-86;
      this.velocity.x = 0;
    }
    
    this.velocity.x *= this.velocity.X_deceleration;
    if (Math.abs(this.velocity.x) < 0.1){
      this.velocity.x = 0;
    }

  }
  /**
   * a jump function
   */
  Jump(jumpVelo){
    if (this.position.y == FLOOR-this.height){
      this.velocity.y = jumpVelo;
      this.position.y--;
    }
  }

  /*
  Movement code
  */
  Move(Dir){
      this.velocity.x += Dir;
      if (this.velocity.x>0){
        this.velocity.x = Math.min(this.velocity.x,this.velocity.max_X)
      } else {
        this.velocity.x = Math.min(-this.velocity.x,this.velocity.max_X)*-1
      }
  }

  /**
  input true if they are ducking, or false if they are not.
  */
  Duck(input){
    if (input){
      this.isDucking = true;
    } else {
      this.isDucking = false;
    }
  }
  /**
  * ID[0] = X co-ordinate on image sheet
  * ID[1] = Y co-ordinate on image sheet
  * ID[2] = Width on image sheet
  * ID[3] = Hieght on image sheet
  */
  DinoImageFrame = [
    [1855,2,86,93],[1943,2,86,93],[1679,2,86,93],[2207,36,117,59],[2325,36,117,59]
  ]
  

  /**
   * Draw the player on the canvas
   */
  draw() {
    this.groundedAnimationTimer--;
    if (this.animationFrame >=3&&!this.isDucking)this.position.y -= this.DinoImageFrame[this.animationFrame][1];
    if (this.animationFrame < 3&& this.isDucking){
      this.position.y += this.DinoImageFrame[3][1]
      this.animationFrame = 3;
    }
    if (this.isDucking){
      if (this.animationFrame == 3&&this.groundedAnimationTimer<=0){
        this.animationFrame = 4;
        this.groundedAnimationTimer = 5;
      } else if (this.groundedAnimationTimer<=0) {
        this.animationFrame = 3;
        this.groundedAnimationTimer = 5;
      }
    } else if(this.position.y - this.velocity.y < FLOOR-this.height) {
      this.animationFrame = 2;
    } else if (this.animationFrame == 0&&this.groundedAnimationTimer<=0){
      this.animationFrame = 1;
      this.groundedAnimationTimer = 5;
    } else if (this.groundedAnimationTimer<=0) {
      this.animationFrame = 0;
      this.groundedAnimationTimer = 5;
    }
    let frameData = this.DinoImageFrame[this.animationFrame]
    this.height = frameData[3];
    this.width = frameData[2];
    CTX.fillStyle = "yellow";
    if (debugMode) CTX.fillRect(this.position.x + ((this.width/2)*(1-this.boxWidth)), this.position.y + ((this.height/2)*(1-this.boxHeight)), this.width*this.boxWidth,this.height*this.boxHeight);
    CTX.drawImage(ground,frameData[0],frameData[1],frameData[2],frameData[3],this.position.x,this.position.y,frameData[2],frameData[3]);
  
  }
}
