import UPNG from '@pdf-lib/upng';
import { SpriteLib } from './SpriteLib.lib';
import { createSnackbar } from '$store/Snackbar.store';
import type { BytesBuffer } from '$lib/BytesBuffer';

export class Sprite {
    constructor(id : number, rgbaArray : Uint8Array){
        if (!id || !rgbaArray){
            throw new Error('A sprite needs to be instanciated with an id & a RGBA array.');
        }

        this._id = id;
        this._rgbaArray = rgbaArray;
    }

    private _rgbaArray : Uint8Array;
    private _id : number;
    private _isEmpty! : boolean;
    private _transparent : boolean = false;
    private _compressedPixels : Uint8Array = new Uint8Array();

    public get id() : number {
        return this._id;
    }

    public get uint8array() : Uint8Array {
        return this._rgbaArray;
    }

    public get rgbaArray() : Uint8Array {
        return this._rgbaArray;
    }

    public get width() : number {
        if (this._rgbaArray.length === 4096){
            return 32;
        }
        else if(this._rgbaArray.length === 16384){
            return 64;
        }
        else if(this._rgbaArray.length === 65536){
            return 128;
        }
        else {
            return -1;
        }
    }

    public get height() : number {
        if (this._rgbaArray.length === 4096){
            return 32;
        }
        else if(this._rgbaArray.length === 16384){
            return 64;
        }
        else if(this._rgbaArray.length === 65536){
            return 128;
        }
        else {
            return -1;
        }
    }

    public get transparent() : boolean {
        return this._transparent;
    }

    public get isEmpty() : boolean {
        return this._compressedPixels.byteLength === 0;
    }

    public set transparent(value : boolean) {
        this._transparent = value;
    }

    public get compressedPixels() : Uint8Array {
        return this._compressedPixels;
    }

    public erase(){
        for (let i=0; i < this._rgbaArray.length; i++){
            this._rgbaArray[i] = 0;
        }
        
        this._compressedPixels = new Uint8Array();
    }

    public setCompressedPixels(uint8array : Uint8Array){
        this._compressedPixels = uint8array;
    }

    public generateCompressedPixels() : void {
        this.setCompressedPixels(SpriteLib.generateCompressedPixels(this._rgbaArray));
    }

    public setRGBAarrayFromPNG(buffer : BytesBuffer) : void {
        const upng : UPNG.Image = UPNG.decode(buffer.toArrayBuffer());

        if (upng.width != this.width || upng.height != this.height){
            createSnackbar({ message: `This spritesheet can only hold ${this.width}x${this.height} sprites.`, color: 'bg-red-400', textColor: 'text-white' });
            throw new Error(`This spritesheet can only hold ${this.width}x${this.height} sprites.`);
        }else{
            this._rgbaArray = new Uint8Array(UPNG.toRGBA8(upng)[0]);
        }
    }
}