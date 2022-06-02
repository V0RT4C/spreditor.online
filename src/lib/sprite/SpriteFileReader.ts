import type { BytesBuffer } from "$lib/BytesBuffer";
import { getInfoFromSPRSignature } from "$lib/versions";
import { Sprite } from "./Sprite";
import { SpritesContainer } from "./SpritesContainer";

export const spriteParser = function(buffer : BytesBuffer) : SpritesContainer {
    let headerSize: number;
    let extended : boolean = false;

    buffer.seek(0);
    //Converts the x and y values to an index value
    let getIndexFromXY = (x : number, y : number) => (x + 32*y)*4;
    //let sprites : { [any:string]: any }= new Object();

    let sprites : SpritesContainer = new SpritesContainer();
    let sprInfo : { signature: number, sprCount : number } = new Object() as { signature: number, sprCount : number };
    sprInfo.signature = buffer.readUint32LE();

    const clientInfo = getInfoFromSPRSignature(sprInfo.signature.toString(16));

    if (clientInfo !== null && clientInfo[0].value >= 960){
      extended = true;
    }

    if (extended){
      headerSize = 8;
      sprInfo.sprCount = buffer.readUint32LE();
    }else{
      headerSize = 6;
      sprInfo.sprCount = buffer.readUint16LE();
    }
    
    for (let spriteId=1; spriteId <= sprInfo.sprCount; spriteId++){
      let formula = headerSize + (spriteId - 1) * 4;
      buffer.seek(formula);
      let sprite : Uint8Array = new Uint8Array(4096);

      //Fill basecolor
      for(let i = 0; i < 4096; i+=4) {
        sprite[i] = 0;
        sprite[i+1] = 0;
        sprite[i+2] = 0;
        sprite[i+3] = 0;
      }
      
      let spriteAddress : number = buffer.readUint32LE();

      if (spriteAddress == 0) {
        const emptySprite = new Sprite(spriteId, sprite);
        sprites.addSprite(emptySprite);
        //sprites[`${spriteId}`] = sprite;
        continue;
      };

      buffer.seek(spriteAddress);
      buffer.skip(3);
      let sprSize : number = buffer.readUint16LE();
      let spriteBufferEndPos = buffer.position + sprSize;

      let currPixel : number = 0;
      let size : number = 32;

      while(buffer.position < spriteBufferEndPos){
        let transparentPixels : number = buffer.readUint16LE();
        let coloredPixels : number = buffer.readUint16LE();

        currPixel += transparentPixels;
        for (let i=0; i < coloredPixels; i++){
            let x : number = currPixel % size;
            let y : number = Math.floor(currPixel / size);
            let r : number = buffer.readUint8() as number;
            let g : number = buffer.readUint8() as number;
            let b : number = buffer.readUint8() as number;
            let a : number = 255;

            // if (extended){
            //   a = buffer.readUint8();
            // }else{
            //   a = 255;
            // }

            let index : number = getIndexFromXY(x, y);
            sprite[index] = r;
            sprite[index+1] = g;
            sprite[index+2] = b;
            sprite[index+3] = a;
          currPixel++;
        }
      }

      const newSprite = new Sprite(spriteId, sprite);
      sprites.addSprite(newSprite);
    }

    sprites.externalCount = sprInfo.sprCount;
    sprites.signature = sprInfo.signature;
    return sprites;
}
