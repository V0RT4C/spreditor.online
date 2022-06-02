import type { Sprite } from "./Sprite";
import SpriteWorkerCompiler from '$lib/webworkers/sprite_compile.worker?worker';

export class SpritesContainer {
    private _list : { [any:string]: Sprite } = {};
    private _length : number = 0;
    private _internal_count : number = 0;
    private _external_count : number = 0;
    private _signature : number = 0;
    private _version : number = 0;


    public addSprite(data : Sprite){
        this._list[data.id.toString()] = data;
        this._length++;
    }

    public deleteSprite(id : number) : void {
        if (typeof this._list[id.toString()] !== 'undefined'){
            delete this._list[id.toString()];
            this._length--;
        }
    }

    public getSpriteById(id : number) : Sprite | null {
        if (typeof this._list[id.toString()] !== 'undefined'){
            return this._list[id.toString()];
        }else{
            return null;
        }
    }

    public getSpriteListOfCompressedPixels() : { id: number, pixels : Uint8Array}[] {
        let sprites : { id: number, pixels: Uint8Array }[] = [];

        for (const id in this._list){
            const currSprite : Sprite = this._list[id];
            sprites.push({ id: currSprite.id, pixels: currSprite.compressedPixels });
        }

        return sprites;
    }

    public workerCompile() : EventTarget {
        const worker = new SpriteWorkerCompiler();
        const event = new EventTarget();
        const data = this.getSpriteListOfCompressedPixels();

        worker.postMessage({ signature: this._signature, version: this._version, sprites: data });
        worker.onmessage = function(e : any){
            if (e.data.type === 'update'){
                event.dispatchEvent(new CustomEvent('update', { detail: e.data.msg }));
            }
            else if(e.data.type === 'progress'){
                event.dispatchEvent(new CustomEvent('progress', { detail: e.data.msg }))
            }
            else if(e.data.type === 'completed'){
                event.dispatchEvent(new CustomEvent('completed', { detail: e.data.msg }))
            }
        }

        return event;
    }

    public set signature(value : number) {
        if (value > 4294967296){
            throw new Error('Invalid signature');
        }

        this._signature = value;
    }

    public set version(value : number) {
        this._version = value;
    }

    public get version() : number {
        return this._version;
    }

    public get internalCount() : number {
        return this._length; //Id starts at one
    }

    public get externalCount() : number {
        return this._external_count;
    }

    public set externalCount(value : number) {
        this._external_count = value;
    }

    public get signature() : number {
        return this._signature;
    }

    public get signatureHexString() : string {
        return this._signature.toString(16).toUpperCase();
    }

    public get length() : number {
        return this._length;
    }

    public get array() : Sprite[] {
        const spriteArray : Sprite[] = [];

        for (const id in this._list){
            spriteArray.push(this._list[id]);
        }

        return spriteArray;
    }

    public get objList() : { [any:string]: Sprite } {
        return this._list;
    }
}