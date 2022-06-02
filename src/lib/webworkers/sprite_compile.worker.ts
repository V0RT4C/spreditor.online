import { SpriteLib } from '$lib/sprite/SpriteLib.lib';
const worker = self as any;

worker.onmessage = function(e : any){
    const sprites = e.data.sprites;
    const signature = e.data.signature;
    const version = e.data.version;
    const spriteFileBuffer : Uint8Array = SpriteLib.compile(signature, version, sprites, worker);
    worker.postMessage({ type: 'completed', msg: spriteFileBuffer });
}