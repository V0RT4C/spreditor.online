import type { Sprite } from "$lib/sprite/Sprite";
import { writable } from "svelte/store";
import { getNominalSpritesPerPage, SPRITES_PER_LOAD } from "./sprEditor.lib";

export interface SpriteEditorStore {
    activeSprite: Sprite,
    sprSignature: number,
    version: number,
    sprCount: number,
    spritesToShow: Sprite[],
    sprites: Sprite[],
    spritesToShowStartIndex: number,
    spritesToShowEndIndex: number,
    spriteEditCount: number,
    clientInfo: any[],
    hasLoadedSprites: boolean,
    isOldVersion: boolean,
    refreshDOMToggle: boolean,
    hasGeneratedCompressedPixels: boolean,
    SPRITES_PER_PAGE: number
}

const { subscribe, set, update } = writable<SpriteEditorStore | any>({
    activeSpriteId: null,
    sprSignature: 0,
    version: 0,
    sprCount: 0,
    spritesToShow: [],
    sprites: [],
    spritesToShowStartIndex: 0,
    spritesToShowEndIndex: SPRITES_PER_LOAD,
    clientInfo: [],
    hasLoadedSprites: false,
    isOldVersion: false,
    refreshDOMToggle: false,
    hasGeneratedCompressedPixels: false,
    SPRITES_PER_PAGE: 50
});

const nextPage = () => {
    update((store : SpriteEditorStore) => {
        if (store.spritesToShowEndIndex + store.SPRITES_PER_PAGE < store.sprCount){
            store.spritesToShowStartIndex = store.spritesToShowEndIndex;
            store.spritesToShowEndIndex += store.SPRITES_PER_PAGE;
            store.spritesToShow = store.sprites.slice(store.spritesToShowStartIndex, store.spritesToShowEndIndex);
            return store;
        }
        else{
            lastPage();
            return store;
        }
    });
}

const prevPage = () => {
    update((store : SpriteEditorStore) => {
        if (store.spritesToShowStartIndex - store.SPRITES_PER_PAGE >= 0){
            store.spritesToShowEndIndex = store.spritesToShowStartIndex;
            store.spritesToShowStartIndex -= store.SPRITES_PER_PAGE;
            store.spritesToShow = store.sprites.slice(store.spritesToShowStartIndex, store.spritesToShowEndIndex);
            return store;
        }else{
            firstPage();
            return store;
        }
    });
}

const firstPage = () => {
    update((store : SpriteEditorStore) => {
        store.spritesToShowStartIndex = 0;
        store.spritesToShowEndIndex = store.SPRITES_PER_PAGE;
        store.spritesToShow = store.sprites.slice(store.spritesToShowStartIndex, store.spritesToShowEndIndex);
        return store;
    });
}

const lastPage = () => {
    update((store : SpriteEditorStore) => {
        store.spritesToShowStartIndex = store.sprCount as number - store.SPRITES_PER_PAGE;
        store.spritesToShowEndIndex = store.sprCount as number;
        store.spritesToShow = store.sprites.slice(store.spritesToShowStartIndex, store.spritesToShowEndIndex);
        return store;
    });
}

const reset = () => {
    set({
        activeSpriteId: null,
        sprSignature: 0,
        version: 0,
        sprCount: 0,
        spritesToShow: [],
        sprites: [],
        spritesToShowStartIndex: 0,
        spritesToShowEndIndex: getNominalSpritesPerPage(),
        clientInfo: [],
        hasLoadedSprites: false,
        isOldVersion: false,
        refreshDOMToggle: false,
        hasGeneratedCompressedPixels: false,
        SPRITES_PER_PAGE: getNominalSpritesPerPage()
    });
}

export {
    subscribe,
    set,
    update,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    reset
}