<Modal 
    {show}
    on:close
>
<div class="w-80">
    <div>
        {#if !isGenerating}
            <div class="p-4 flex flex-col justify-center items-center gap-4">
                <i class="block icon ots-png-file text-accent text-4xl"></i>
                <span class="text-xs text-secondary">Generates a ZIP-archive with .PNG sprites</span>
            </div>
            <button on:click={onStartGenerating} class="w-full p-2 bg-accent mt-4 rounded-b-lg">Start</button>
        {:else}
            <div class="p-4 flex flex-col justify-center items-center gap-4 cursor-pointer">
                <i class="block icon ots-zip-file text-accent text-4xl"></i>
                <span class="text-xs text-secondary">{generateMessage}</span>
            </div>
            <div class="p-4">
                <div class="w-full bg-primary rounded-full h-2">
                    <div class="bg-accent text-xs font-medium p-0.5 leading-none rounded-full text-center h-2" style={`width: ${progressPercent}%`}></div>
                </div>
                <div class="w-full text-center text-sm mt-2">{progressPercent.toFixed(1)}%</div>
            </div>
        {/if}
    </div>
</div>
</Modal>

<script lang="ts">
import { onDestroy, createEventDispatcher } from 'svelte';
import * as sprEditorStore from './sprEditor.store';
import type { SpriteEditorStore } from './sprEditor.store';
import Modal from '$lib/components/Modal.component.svelte';
import SpriteExportWorker from '$lib/webworkers/sprite_export.worker?worker';

import save from 'save-file';;
import type { Sprite } from '$lib/sprite/Sprite';

export let show : boolean = false;
let isGenerating : boolean = false;
let generateMessage : string = "";
let progressPercent : number = 0;
let sprites : Sprite[] = [];

const dispatch = createEventDispatcher();

const unsub = sprEditorStore.subscribe((store : SpriteEditorStore) => {
    sprites = store.sprites;
});

const onStartGenerating = async function(){
    isGenerating = true;

    const worker = new SpriteExportWorker();
    worker.postMessage({ sprites });

    worker.addEventListener('message', async (e) => {
        if (e.data.type === 'update'){
            progressPercent = e.data.progressPercent;
            generateMessage = e.data.msg;
        }
        else if(e.data.type === 'data'){
            progressPercent = 100;
            const blob = e.data.msg;
            await save(blob, 'sprites.zip');
            isGenerating = false;
            worker.terminate();
            dispatch('close');
        }
    });
}

onDestroy(() => {
    unsub();
})
</script>