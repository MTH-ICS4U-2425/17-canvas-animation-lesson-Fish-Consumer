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
      max_X: 3,
      y: 0,
      max_Y: 14.7
    };
  }



  /**
   * Main function to update location, velocity, and image
   */
  update() {
    this.draw();
    console.log(Math.min(this.velocity.x,10));
    this.position.x += this.velocity.x;

    if (this.position.y>=FLOOR-this.height){
      this.position.y = FLOOR-this.height;
      this.velocity.y = 0;

    } else {
      if (this.velocity.y<=this.velocity.max_Y){
        this.velocity.y -= GRAVITY;

      } else {this.velocity.y = this.velocity.max_Y}
      this.position.y -= this.velocity.y;
    }

    this.velocity.x*=0.9;
    if (Math.abs(this.velocity.x) < 0.001){
      this.velocity.x = 0;
    }

  }
  /**
   * a jump function
   */
  Jump(){
    if (this.position.y == FLOOR-this.height){
      this.velocity.y = 15;
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
