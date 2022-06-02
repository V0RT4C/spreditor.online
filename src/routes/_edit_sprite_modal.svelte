<Modal 
    {show}
    on:close
    >
    <div class="w-80">
        {#if activeSprite !== null}
            <div class="p-4 border-b border-solid border-primary flex justify-center">
                <h1>Sprite #{activeSprite.id}</h1>
            </div>
            <div class="p-4 flex justify-center items-center border-b border-solid border-primary">
                {#key refreshDOMToggle}
                    <label for="replace-upload">
                        <canvas
                            use:fillCanvasElement={activeSprite}
                            id={`canvas-active-sprite`}
                            width={64}
                            height={64}
                            style={`width:64px; height:64px`}
                            class="inline-block m-1 border border-solid border-primary cursor-pointer"
                        ></canvas>
                    </label>
                {/key}
            </div>
            <div class="flex flex-col gap-2 p-4">
                <label for="replace-upload" class="w-full border border-solid border-primary text-accent p-1 text-xs flex justify-center cursor-pointer">
                    Replace
                </label>
                <input on:change={onReplaceSprite} id="replace-upload" type="file" accept=".png,.PNG" class="hidden">
                <button on:click={onEraseSprite} class="w-full border border-solid border-primary text-red-400 p-1 text-xs">Erase</button>
            </div>
        {/if}
    </div>
</Modal>

<script lang="ts">
import { onDestroy, createEventDispatcher } from 'svelte';
import * as sprEditorStore from './sprEditor.store';
import type { SpriteEditorStore } from './sprEditor.store';
import Modal from '$lib/components/Modal.component.svelte';
import type { Sprite } from '$lib/sprite/Sprite';
import { BytesBuffer } from '$lib/BytesBuffer';

let activeSprite : Sprite;

let refreshDOMToggle : boolean;

export let show : boolean = false;

const dispatch = createEventDispatcher();

const unsub = sprEditorStore.subscribe((store : SpriteEditorStore) => {
    activeSprite = store.activeSprite;
    refreshDOMToggle = store.refreshDOMToggle;
});

const fillCanvasElement = (canvas : HTMLCanvasElement, sprite: Sprite) => {
    if (typeof sprite !== 'undefined' && typeof sprite.rgbaArray !== 'undefined'){
        const mainCanvas : HTMLCanvasElement = canvas;
        const mainCtx = mainCanvas.getContext('2d');
        const clampedSpriteArray = Uint8ClampedArray.from(sprite.rgbaArray);
        const imageData = new ImageData(clampedSpriteArray, 32, 32);
        const temporaryCanvas : HTMLCanvasElement = document.createElement('canvas');
        temporaryCanvas.width = imageData.width;
        temporaryCanvas.height = imageData.height;
        temporaryCanvas.getContext('2d')?.putImageData(imageData, 0, 0);
        mainCtx?.drawImage(temporaryCanvas, 0,0, 64,64);
    }
}

const onReplaceSprite = async (e : any) => {
    const pngBuffer : BytesBuffer = new BytesBuffer(await (e.target.files[0] as File).arrayBuffer());

    activeSprite.setRGBAarrayFromPNG(pngBuffer);
    activeSprite.generateCompressedPixels();

    sprEditorStore.update((store : SpriteEditorStore) => {
        store.refreshDOMToggle = !store.refreshDOMToggle;
        return store;
    });

    dispatch('spriteChanged');
    dispatch('close');
}

const onEraseSprite = async (e : any) => {
    activeSprite.erase();
    
    sprEditorStore.update((store : SpriteEditorStore) => {
        store.refreshDOMToggle = !store.refreshDOMToggle;
        return store;
    });

    dispatch('spriteChanged');
    dispatch('close');
}

onDestroy(() => {
    unsub();
});
</script>