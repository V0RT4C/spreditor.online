<div class={`mt-4 bg-primary w-full border border-solid border-primary rounded-lg p-2 h-16 flex lg:block justify-between items-center`}>
    <div class="lg:relative lg:top-[4px] flex justify-start items-center px-2 float-left">
        <button on:click={onAddSprite} class="border border-solid bg-secondary border-primary rounded-lg flex justify-center items-center py-0.5 px-3 cursor-pointer select-none">
            <span class="relative top-[-1px] text-2xl font-bold text-accent">+</span>
        </button>
    </div>
    {#if hasLoadedSprites}
        <div class="hidden lg:flex items-center justify-center lg:relative lg:top-[15px]">
            <Pagination 
                showingStart={startIndex === 0 ? startIndex + 1 : startIndex}
                showingEnd={endIndex}
                totalCount={sprCount}
                on:next={sprEditorStore.nextPage}
                on:prev={sprEditorStore.prevPage}
            />
        </div>
        <div class="lg:relative lg:top-[-10px] flex justify-end items-center px-2 gap-2 float-right">
            <div class="w-20">
                <Select 
                    options={[{ name: 'Show all', value: 'all' }, { name: 'Show empty', value: 'empty' }]}
                    selectedOption={{ name: 'Show all', value: 'all' }}
                    on:change={(e) => dispatch('filter', e.detail)}
                />
            </div>
            <div class="relative w-28 text-gray-600 focus-within:text-gray-400">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <input bind:value={searchStr} on:input={() => dispatch('search')} type="search" name="q" class="py-2 w-28 text-white text-xs bg-secondary rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 border border-solid border-primary" placeholder="Search id..." autocomplete="off">
            </div>
        </div>
    {/if}
</div>

<script lang="ts">
import { createEventDispatcher, onDestroy } from 'svelte';
import Pagination from '$lib/components/Pagination.svelte';
import * as sprEditorStore from './sprEditor.store';
import type { SpriteEditorStore } from './sprEditor.store';
import Select from '$lib/components/Select.svelte';
import { Sprite } from '$lib/sprite/Sprite';

let startIndex : number;
let endIndex : number;
let sprCount : number;
let hasLoadedSprites : boolean = false;


const unsub = sprEditorStore.subscribe((store : SpriteEditorStore) => {
    startIndex = store.spritesToShowStartIndex;
    endIndex = store.spritesToShowEndIndex;
    sprCount = store.sprCount as number;
    hasLoadedSprites = store.hasLoadedSprites;
});

const onAddSprite = () => {
    sprEditorStore.update((store : SpriteEditorStore) => {
        store.sprites = [...store.sprites, new Sprite(store.sprites.length + 1, new Uint8Array(4096))];
        store.spritesToShow = store.sprites.slice(store.spritesToShowStartIndex, store.spritesToShowEndIndex);
        store.sprCount = store.sprites.length;
        return store;
    });
}

export let searchStr : string;

const dispatch = createEventDispatcher();

onDestroy(() => {
    unsub();
});
</script>