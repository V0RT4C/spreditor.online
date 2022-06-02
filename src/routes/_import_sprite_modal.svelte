<Modal 
    {show}
    on:close
>
<div class="w-80">
    <div class="p-4">
        <label for="spr-import" class="p-4 border border-solid border-primary flex flex-col justify-center items-center gap-4 cursor-pointer">
            <i class="block icon ots-import text-accent text-4xl"></i>
            <span class="text-xs text-secondary">Import a .SPR file to start.</span>
        </label>
        <input 
            id="spr-import" 
            class="hidden" 
            accept=".SPR,.spr" 
            type="file" 
            on:change="{onFileInputChange}"
        />
    </div>
</div>
</Modal>

<script lang="ts">
import { createEventDispatcher, onDestroy } from 'svelte';
import Modal from '$lib/components/Modal.component.svelte';
import * as sprEditorStore from './sprEditor.store';
import type { SpriteEditorStore } from './sprEditor.store';

import { spriteParser } from '$lib/sprite/SpriteFileReader';
import { spriteParserOldVersions } from '$lib/sprite/SpriteFileReader_pre_700';
import { getInfoFromSPRSignature, isValidSPRFile } from '$lib/versions';
import type { SpritesContainer } from '$lib/sprite/SpritesContainer';
import type { Sprite } from '$lib/sprite/Sprite';
import GenerateCompressedPixelsWorker from '$lib/webworkers/generate_compressed_pixels.worker?worker';
import { createSnackbar } from '../store/Snackbar.store';
import { BytesBuffer } from '$lib/BytesBuffer';

export let show : boolean = false;
let sprites : Sprite[] = [];

const dispatch = createEventDispatcher();

const unsub = sprEditorStore.subscribe((store : SpriteEditorStore) => {
    sprites = store.sprites;
});

const onFileInputChange = async function(e : any){
    const buffer = new BytesBuffer(await (e.target.files[0] as File).arrayBuffer());
    dispatch('close');
    loadSprites(buffer);
}

const loadSprites = (buffer : BytesBuffer) => {
    let data : SpritesContainer;

    try {
        data = spriteParser(buffer);
        const version = getInfoFromSPRSignature(data.signatureHexString);

        if (!isValidSPRFile(data.signature.toString(16))){
            throw new Error('Not a modern .SPR file.');
        }

        sprEditorStore.update((store : SpriteEditorStore) => {
            store.sprites = data.array;
            store.spritesToShow = data.array.slice(0, store.SPRITES_PER_PAGE);
            store.sprSignature = data.signature;
            store.version = version !== null ? version[0].value : 0,
            store.sprCount = store.sprites.length;
            store.clientInfo = getInfoFromSPRSignature(data.signatureHexString) as any;
            store.hasLoadedSprites = true;
            store.isOldVersion = false;
            return store;
        });

    }catch(err){
        
        try {
            data = spriteParserOldVersions(buffer);

            sprEditorStore.update((store : SpriteEditorStore) => {
                store.sprites = data.array;
                store.spritesToShow = data.array.slice(0, store.SPRITES_PER_PAGE);
                store.sprSignature = data.signature;
                store.sprCount = data.length;
                store.hasLoadedSprites = true;
                store.isOldVersion = true;
                return store;
            });
        }catch(err){
            createSnackbar({ message: 'Not a valid .SPR file.', color: 'bg-red-400'})
            return;
        }
    }

    setTimeout(() => {
        const worker = new GenerateCompressedPixelsWorker();
        worker.postMessage({ sprites });
        worker.onmessage = (event : any) => {
            const compressedPixelsObj = event.data.msg;
            let keys = Object.keys(compressedPixelsObj);

            for (let i=0; i < keys.length; i++){
                if (typeof sprites[i] !== 'undefined'){
                    sprites[i].setCompressedPixels(compressedPixelsObj[keys[i]]);
                }
            }

            sprEditorStore.update((store: SpriteEditorStore) => {
                store.hasGeneratedCompressedPixels = true;
                return store;
            });
        };
    }, 0);
}

onDestroy(() => {
    unsub();
})
</script>