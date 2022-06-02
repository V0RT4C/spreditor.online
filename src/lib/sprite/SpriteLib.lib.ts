import { BytesBuffer } from "$lib/BytesBuffer";
import { versions } from '$lib/versions';

export class SpriteLib {
    static generateCompressedPixels(rgbaArray : Uint8Array) : Uint8Array {
        const pixels = new BytesBuffer(rgbaArray);
        const compressedPixels = new BytesBuffer(4096);

        let index : number = 0;
        let r : number;
        let g : number;
        let b : number;
        let a : number;
        let transparentPixel : boolean = true;
        let alphaCount : number = 0;
        let chunksize : number;
        let coloredPosition : number;
        let finishOffset : number;
        let length : number = pixels.byteLength / 4;

        while(index < length){

            chunksize = 0;

            while(index < length){
                pixels.seek(index * 4);
                
                r = pixels.readUint8();
                g = pixels.readUint8();
                b = pixels.readUint8();
                a = pixels.readUint8();

                transparentPixel = (a === 0);

                if (!transparentPixel) break;

                alphaCount++;
                chunksize++;
                index++;
            }

            if (alphaCount < length){

                if (index < length){
                    compressedPixels.writeUint16LE(chunksize); // Write transparent pixels
                    coloredPosition = compressedPixels.position; //Save colored position
                    //compressedPixels.alloc(2);
                    compressedPixels.seek(compressedPixels.position + 2); //Skip coloredsize uint16
                    chunksize = 0;

                    while (index < length){
                        pixels.seek(index * 4);
                        
                        r = pixels.readUint8();
                        g = pixels.readUint8();
                        b = pixels.readUint8();
                        a = pixels.readUint8();

                        transparentPixel = (a === 0);
                        if (transparentPixel) break;

                        compressedPixels.writeUint8(r);
                        compressedPixels.writeUint8(g);
                        compressedPixels.writeUint8(b);

                        //if (this._transparent) compressedPixels.writeUint8(a); //Write alpha

                        chunksize++;
                        index++;
                    }

                    finishOffset = compressedPixels.position;
                    compressedPixels.seek(coloredPosition); //Go back to colored chunksize indicator
                    compressedPixels.writeUint16LE(chunksize);  //Write amount of colored pixels
                    compressedPixels.seek(finishOffset);
                }
            }
        }
        
        return compressedPixels.slice(0, compressedPixels.highestPosition);
    }

    public static compile(signature : number, version: number, datas : { id: number, pixels: Uint8Array }[], worker? : Worker) : Uint8Array {
        if (worker){
            worker.postMessage({ type: 'update', msg: 'Starting to compile file.' });
        }

        let extended : boolean = false;

        if (version >= 960){
            extended = true;
        }
        
        let count : number;
        let headerSize : number;

        if (extended){
            count = datas.length;
            headerSize = 8;
        }else{
            count = datas.length >= 0xFFFF ? 0xFFFE : datas.length;
            headerSize = 6;
        }

        let offset : number = (count * 4) + headerSize;
        let total : number = 0;

        const data : any = {};
        for (let i=0; i < datas.length; i++){
            data[datas[i].id.toString()] = datas[i].pixels;
        }


        const buffer = new BytesBuffer(180000000);

        buffer.seek(0);
        buffer.writeUint32LE(signature);

        if (extended){
            buffer.writeUint32LE(count);
        }else{
            buffer.writeUint16LE(count);
        }

        let addressPosition : number = buffer.position;

        for (let id=1; id <= count; id++){
            buffer.seek(addressPosition);

            let sprite : Uint8Array = data[id];

            if (sprite.byteLength === 0){
                buffer.writeUint32LE(0);
            }else{
                //console.log(sprite.id);
                let compressedPixels : BytesBuffer = new BytesBuffer(sprite);
                //sprite.transparent = transparency; not implemented yet
                compressedPixels.seek(0);
                buffer.writeUint32LE(offset); //Address
                buffer.seek(offset);
                buffer.writeUint8(0xFF);
                buffer.writeUint8(0x00);
                buffer.writeUint8(0xFF);
                buffer.writeUint16LE(compressedPixels.byteLength);

                if (compressedPixels.byteLength > 0){
                    buffer.writeBytes(compressedPixels, buffer.position);
                    total += compressedPixels.byteLength;
                }

                offset = buffer.position;
            }

            addressPosition += 4;

            if (worker){
                worker.postMessage({ type: 'update', msg: `Added sprite ${id}/${count} to file.`});
                worker.postMessage({ type: 'progress', msg: ((id / count) * 100) });
            }
        }

        if (worker){
            worker.postMessage({ type: 'update', msg: 'Done! You should now get a prompt to download the file.' });
        }

        let retbuff = buffer.slice(0, buffer.highestPosition);
        return retbuff;
    }
}