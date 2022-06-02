import { SpriteLib } from '$lib/sprite/SpriteLib.lib';

const worker = self as any;

worker.onmessage = (event : any) => {
    const sprites : { _id: number, _rgbaArray: Uint8Array }[] = event.data.sprites;
    const compressedPixelsObj : { [any:string]: Uint8Array } = {};

    for (let i=0; i < sprites.length; i++){
        const currSprite = sprites[i];
        const compressedPixels = SpriteLib.generateCompressedPixels(currSprite._rgbaArray);
        compressedPixelsObj[currSprite._id.toString()] = compressedPixels;
    }

    worker.postMessage({ type: 'completed', msg: compressedPixelsObj });
}