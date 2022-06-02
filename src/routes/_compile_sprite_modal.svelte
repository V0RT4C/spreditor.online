<Modal
    {show}
    on:close
>
    {#if !isCompiling}
        <div class="w-80">
            <div class="p-4 border-b border-solid border-primary flex justify-center">
                <h1 class="text-base text-accent">Compilation settings</h1>
            </div>
            <div class="p-4">
                <div class="px-4 py-2">
                    <span class="text-sm">Version</span>
                    <div class="mt-2">
                        <Select 
                            options={v}
                            bind:selectedOption={selectedOption}
                        />
                    </div>
                </div>
                <div class="px-4 py-2 text-sm">
                    <span class="block">Signature</span>
                    <input bind:value={signature} type="text" class="mt-2 w-full py-2 px-4 text-white text-xs bg-primary rounded-md focus:outline-none border border-solid border-primary" disabled />
                </div>
                <div class="px-4 py-2">
                    <span class="block text-sm">Custom signature</span>
                    <p class="text-xs text-secondary">If you want to use a custom signature write it here in hex format</p>
                    <input bind:value={customSignature} type="text" class="mt-2 w-full py-2 px-4 text-white text-xs bg-primary rounded-md focus:outline-none border border-solid border-primary" />
                </div>
            </div>
            <button disabled={!hasGeneratedCompressedPixels} on:click={onCompile} class={`w-full p-2 ${hasGeneratedCompressedPixels ? 'bg-accent' : 'bg-gray-400'} mt-4 rounded-b-lg`}>Compile</button>
        </div>
    {:else}
        <div class="w-80">
            <div class="p-4 flex flex-col justify-center items-center gap-4 cursor-pointer">
                <i class="block icon ots-zip-file text-accent text-4xl"></i>
                <span class="text-xs text-secondary">{compileMessage}</span>
            </div>
            <div class="p-4">
                <div class="w-full bg-primary rounded-full h-2">
                    <div class="bg-accent text-xs font-medium p-0.5 leading-none rounded-full text-center h-2" style={`width: ${progressPercent}%`}></div>
                </div>
                <div class="w-full text-center text-sm mt-2">{progressPercent.toFixed(1)}%</div>
            </div>
        </div>
    {/if}
</Modal>

<script lang="ts">
import { onDestroy, createEventDispatcher } from 'svelte';
import Modal from '$lib/components/Modal.component.svelte';
import Select from '$lib/components/Select.svelte';
import { SpritesContainer } from '$lib/sprite/SpritesContainer';
import { versions } from '$lib/versions';
import * as sprEditorStore from './sprEditor.store';
import type { SpriteEditorStore } from './sprEditor.store';
import type { Sprite } from '$lib/sprite/Sprite';
import save from 'save-file';

export let show : boolean = false;
const v = versions.map((vers) => { return { name: vers.string, value: vers.value } });
let selectedOption : { name: string, value: number } = { name: "7.00", value: 700 };
let signature : string;
let customSignature : string;
let sprites : Sprite[] = [];
let isCompiling : boolean = false;
let compileMessage : string = '';
let progressPercent : number = 0;
let hasGeneratedCompressedPixels : boolean = false;

$: if (selectedOption.value){
    const v = versions.filter((version) => version.value === selectedOption.value);
    if (v.length > 0){
        selectedOption = { name: v[0].string, value: v[0].value };
        signature = v[0].spr;
    }
}

const dispatch = createEventDispatcher();

const unsub = sprEditorStore.subscribe((store : SpriteEditorStore) => {
    sprites = store.sprites;
    hasGeneratedCompressedPixels = store.hasGeneratedCompressedPixels;
    selectedOption.value = store.version ? store.version : selectedOption.value;
});

const onCompile = async () => {
   isCompiling = true;
   compileMessage = 'Preparing to build .SPR file.';
   const spritesContainer = new SpritesContainer();
   spritesContainer.signature = Number(`0x${signature}`);
   spritesContainer.version = Number(selectedOption.value);

   if (customSignature){
       spritesContainer.signature = Number(`0x${customSignature}`);
   }

    sprites.forEach((sprite) => {
       spritesContainer.addSprite(sprite);
   });
   
   const event = spritesContainer.workerCompile();

   event.addEventListener('update', (e : any) => {
        compileMessage = e.detail;
   });

   event.addEventListener('progress', (e : any) => {
        progressPercent = e.detail;
   });

   event.addEventListener('completed', async (e : any) => {
        await save(e.detail, 'Tibia.spr');
        isCompiling = false;
        dispatch('close');
   });
};

onDestroy(() => {
    unsub();
});
</script>