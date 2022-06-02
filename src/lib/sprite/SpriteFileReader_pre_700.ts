import { oldSpritePaletteRGB } from "./oldSpritePalette";
import { SpritesContainer } from "./SpritesContainer";
import { Sprite } from "./Sprite";
import type { BytesBuffer } from '$lib/BytesBuffer';


export const spriteParserOldVersions = function(buffer : BytesBuffer) : SpritesContainer {
    let getIndexFromXY = (x : number, y : number) => (x + 32*y)*4;
    let size : number = 32;
    buffer.seek(0);
    const count = buffer.readUint16LE();

    const sprites : SpritesContainer = new SpritesContainer();
    sprites.externalCount = count;

    for (let id=1; id <= count; id++){
        const idd = buffer.readUint16LE();

        let byteArray = new Uint8Array(4096);

        for (let i=0; i < 4096; i+=4){
            byteArray[i] = 0;
            byteArray[i+1] = 0;
            byteArray[i+2] = 0;
            byteArray[i+3] = 0;
        }

        let sprSize = buffer.readUint16LE();
        let sprBufferEndPos = sprSize + buffer.position - 2;

        let currPixel = 0;

        while(buffer.position < sprBufferEndPos){
            const tPixels = buffer.readUint16LE();

            currPixel += tPixels;
            const cPixels = buffer.readUint8();
            for (let c=0; c < cPixels; c++){
                let colorIndex = buffer.readUint8();
                const x : number = currPixel % size;
                const y : number = Math.floor(currPixel / size);
                const r : number = oldSpritePaletteRGB[colorIndex][0];
                const g : number = oldSpritePaletteRGB[colorIndex][1];
                const b : number = oldSpritePaletteRGB[colorIndex][2];
                const a : number = 255;
                const index : number = getIndexFromXY(x, y); 
                byteArray[index] = r;
                byteArray[index+1] = g;
                byteArray[index+2] = b;
                byteArray[index+3] = a;
                currPixel++;
            }
        }

        //Flip sprite vertically
        const flippedBytes = new Uint8Array(byteArray.byteLength);
        const width = size;
        const height = size;
        let k=0;

        for (let i=height - 1; i >= 0 && k < height; i--){
            for (let i2=0; i2 < width * 4; i2++){
                flippedBytes[k*width*4+i2] = byteArray[i*width*4+i2];
            }
            k++;
        }

        const newSprite = new Sprite(id, flippedBytes);
        sprites.addSprite(newSprite);
    }
    

    return sprites;
}