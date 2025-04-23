/**
 * globals.js
 * 
 * Keep all the globals in one place, in case they
 * need to be shared across modules/imports.
 * 
 * Author:
 * 
 */

// Drawing / updating
export const CANVAS = document.getElementById('game_canvas');
export const CTX = CANVAS.getContext('2d', {
      powerPreference: "high-performance"
    });
  
// FPS Trapping
export const FPS = 60;
export const MS_PER_FRAME = 1000 / FPS;

// Img tile set
let why = new Image();
why.src = "../images/dino_large.png";
export const ground = why;

export const debugMode = false;


// Movement
export const GRAVITY = 1;
export const FLOOR = CANVAS.height-28;  // Careful - if the height ever changes...
export function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Some convenient keyboard codes
export const KEYS = {
  SPACE:32,
  UP_ARROW:38,
  LEFT_ARROW:37,
  DOWN_ARROW:40,
  RIGHT_ARROW:39,
  W:87,
  A:65,
  S:83,
  D:68
};

/**
 * Shortcut for the document.getElementById() function
 * @param {String} id The unique identifier of the element being requested.
 * @returns HTML Element Object
 */
export function $(id) { return document.getElementById(id); }

// Export all the constants by default
export default { CANVAS, CTX, FPS, MS_PER_FRAME, GRAVITY, FLOOR, KEYS, $ }
