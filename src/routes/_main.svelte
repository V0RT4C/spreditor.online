<div bind:this={mainElement} class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-11 gap-4 sprites-container">
    {#each sprites as sprite (sprite.id)}
            <div 
                on:click={() => dispatch('spriteEdit', sprite)}
                class="inline-block bg-primary inline-block m-auto border border-solid border-primary rounded-lg cursor-pointer p-2 hover:scale-110 transition-transform duration-100"
            >   
                {#key refreshDOMToggle}
                    <canvas
                        use:fillCanvasElement={sprite}
                        id={`canvas-${sprite.id}`}
                        width={64}
                        height={64}
                        style={`width:64px; height:64px`}
                        class="inline-block m-1 border border-solid border-primary"
                    ></canvas>
                {/key}
                <div class="p-1 flex justify-between items-center">
                    <span class="text-xs text-secondary">
                        {sprite.id}
                    </span>
                    <span>
                        <span class="text-accent">
                            <i class="bx bxs-cog text-xs"></i>
                        </span>
                        <!-- <span class="text-red-400">
                            <i class="bx bxs-trash text-xs"></i>
                        </span> -->
                    </span>
                </div>
            </div>
        <!-- {/if} -->
    {/each}
</div>

<script lang="ts">
import { detectSwipe } from '$lib/helper/swipe';

import { createEventDispatcher, onDestroy, onMount } from 'svelte';
import * as sprEditorStore from './sprEditor.store';

let sprites : any[] = [];
let refreshDOMToggle : boolean;
let mainElement : HTMLElement;

const unsub = sprEditorStore.subscribe((store : sprEditorStore.SpriteEditorStore) => {
    sprites = store.spritesToShow;
    refreshDOMToggle = store.refreshDOMToggle;
});

const dispatch = createEventDispatcher();

const fillCanvasElement = (canvas : HTMLCanvasElement, sprite: any) => {
    if (typeof sprite !== 'undefined' && typeof sprite.id !== 'undefined'){
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


const isInViewport = (element : any) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
onMount(() => {
    detectSwipe(mainElement, (direction : string) => {
        if (direction === 'left'){
            sprEditorStore.nextPage();
        }
        else{
            sprEditorStore.prevPage();
        }
    });
});

onDestroy(() => {
    unsub();
    //Remove event listeners
    mainElement.replaceWith(mainElement.cloneNode(true));
});
</script>

<style>
    .sprites-container::after {
      content: "";
      flex: auto;
    }
</style>