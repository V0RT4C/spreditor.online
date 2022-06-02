<Drawer 
    {show}
    on:close
>
<div class="p-4">
    <h1 class="text-base text-accent">
        SPRITE INFO
    </h1>
    
    <div class="mt-2">
        <h3 class="text-sm">Signature</h3>
        <span class="text-secondary text-xs">
            {sprSignature.toString(16).toUpperCase()}
        </span>
    </div>
    
    <div class="mt-2">
        <h3 class="text-sm">Sprite count</h3>
        <span class="text-secondary text-xs">
            {sprCount}
        </span>
    </div>
    
    {#if clientInfo !== null && clientInfo.length > 0 && !isOldVersion}
        <h1 class="text-base text-accent mt-4">
            CLIENT INFO
        </h1>
    
        {#each clientInfo as item, i}
            <div class="mt-2">
                <h3 class="text-sm">Version</h3>
                <span class="text-secondary text-xs">
                    {item.string}
                </span>
            </div>
        {/each}
    {:else if clientInfo !== null && clientInfo.length > 0 && isOldVersion}
        <h1 class="text-base text-accent mt-4">
            CLIENT INFO
        </h1>
        <div class="mt-2">
            <h3 class="text-sm">Version</h3>
            <span class="text-secondary text-xs">
                1.0 &lt;---&gt; 6.9
            </span>
        </div>
    {/if}
</div>
</Drawer>

<script lang="ts">
import { onDestroy } from 'svelte';
import * as sprEditorStore from './sprEditor.store';
import type { SpriteEditorStore } from './sprEditor.store';
import Drawer from '$lib/components/Drawer.component.svelte';
export let show : boolean = false;

let clientInfo : any;
let isOldVersion : boolean = false;
let sprCount : number | null;
let sprSignature : number;

const unsub = sprEditorStore.subscribe((store : SpriteEditorStore) => {
    clientInfo = store.clientInfo;
    isOldVersion = store.isOldVersion;
    sprCount = store.sprCount;
    sprSignature = store.sprSignature;
});

onDestroy(() => {
    unsub();
});
</script>