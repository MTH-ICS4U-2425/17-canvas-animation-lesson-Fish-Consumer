/**
 * this obejct holds the object used for cacti and the ground texture
 */
import { CTX,CANVAS } from "./globals";

const CactusImageCo_ordinates = [ [446,2,34,70],[480,2,68,70],[514,2,102,70],[652,2,50,99],[702,2,100,99],[802,2,150,99]]

export class GroundSegemnt{
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
       CTX.drawImage(ground,this.SpImDi[0],this.SpImDi[1],this.SpImDi[2],this.SpImDi[3],this.x,FLOOR-this.SpImDi[3],this.SpImDi[2],this.SpImDi[3]);
     } else {
       CTX.drawImage(ground,this.SpImDi*200,102,200,28,this.x,300,200,28);
     }
     if (this.x<=-200){
       if (this.isCactus&&CactusTimer<=0){
         CactusTimer = randInt(7,11)*100;
         this.SpImDi = CactusImageCo_ordinates[randInt(0,5)];
         this.x = Math.floor((CANVAS.width+200)/200)*200;
       } else if (!this.isCactus) {
         this.SpImDi = randInt(0,11);
         this.x = Math.floor((CANVAS.width+200)/200)*200;
       }
       
       
     }
   }
 
 }