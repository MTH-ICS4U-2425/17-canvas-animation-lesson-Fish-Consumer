/**
 * player.js
 * 
 * The Player Class
 * 
 * Acts as a sprite or "hero" for the game
 * 
 * Author: 
 */

import { CTX, CANVAS, GRAVITY, FLOOR, KEYS } from "./globals.js"

export default class Player {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;

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
        this.velocity.y -= GRAVITY;

      } else {this.velocity.y = this.velocity.max_Y}
      this.position.y -= this.velocity.y;
    }

    this.velocity.x *= this.velocity.X_deceleration;
    if (Math.abs(this.velocity.x) < 0.1){
      this.velocity.x = 0;
    }

  }
  /**
   * a jump function
   */
  Jump(){
    if (this.position.y == FLOOR-this.height){
      this.velocity.y = 20;
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
   * Draw the player on the canvas
   */
  draw() {
    CTX.fillStyle = "yellow";
    CTX.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
