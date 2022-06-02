<svelte:head>
<title>Open Tibia Sprite Editor</title>
<meta name="description" content="A Sprite editor for Open Tibia servers. Supports editing/extracting/compiling .SPR files for Tibia versions 3.0 - 10.56.">
<meta property="og:type" content="website" />
<meta property="og:title" content="Open Tibia Sprite Editor" />
<meta property="og:description" content="A Sprite editor for Open Tibia servers. Supports editing/extracting/compiling .SPR files for Tibia versions 3.0 - 10.56." />
<meta property="og:image" content="https://www.spreditor.online/spr-512x512.png" />
<meta property="og:url" content="https://www.spreditor.online" />
<meta property="og:site_name" content="Open Tibia Sprite Editor" />
</svelte:head>

<MobileDrawer
    show={showDrawer}
    on:close={() => showDrawer = false}
/>
<Nav 
    on:extract={() => showExportSpritesModal = true}
    on:compile={() => showCompileSpriteModal = true}
    on:closeFile={() => sprEditorStore.reset()}
    on:import={() => showImportSpriteModal = true}
    on:new={onCreateNew}
    on:drawer={() => showDrawer = true}
/>
<div class="container mx-auto select-none p-2">
    {#if hasLoadedSprites}
    <Menu 
        bind:searchStr={searchStr} 
        on:search={onDoSearch}
        on:filter={(e) => onFilter(e)}
    />
    <div class="lg:hidden py-4">
        <Pagination 
            showingStart={startIndex === 0 ? startIndex + 1 : startIndex}
            showingEnd={endIndex}
            totalCount={sprCount}
            mobile={true}
            on:first={sprEditorStore.firstPage}
            on:last={sprEditorStore.lastPage}
        />  
    </div>

        <div class="grid grid-cols-1 lg:grid-cols-8 lg:mt-4 gap-4">
            <div class="hidden lg:block col-span-1 bg-primary border border-solid border-primary rounded-lg p-4">
                <Side />
            </div>
            <div class="col-span-1 lg:col-span-7">
                <Main 
                    on:spriteEdit={(e) => onEditSprite(e.detail)}
                />
            </div>
        </div>
    {:else}
        <div class="mt-4">
            <div class="p-4 bg-primary border border-solid border-primary rounded-lg text-xs">
                <p class="text-secondary">
                    This Sprite editor supports .SPR files from Tibia client versions 3.0 -> 10.56.
                    <br /><br />
    
                    <span class="text-primary">Recompiling:</span><br/>
                    Editing and recompiling .SPR files is supported for versions >= 7.0.<br />
                    Recompiling older versions is not supported.
                    <br /><br />
                    <span class="text-primary">Extracting:</span><br />
                    This tool allows extracting of sprite files to .PNG image files. This functionality works for all the supported versions.
                    <br /><br />
                    <span class="text-primary">How to use:</span><br />
                    To get started, import or create a new .SPR file by clicking the button(s) above.<br />
                    Once the sprites are imported you can navigate the different pages of sprites by clicking the buttons or using your keyboard.
                    <br /><br />
                    <span class="text-accent">LEFT ARROW KEY</span>    -> Go to previous page<br />
                    <span class="text-accent">RIGHT ARROW KEY</span>   -> Go to next page<br />
                    <span class="text-accent">F KEY</span>             -> Go to first page<br />
                    <span class="text-accent">L KEY</span>             -> Go to last page<br />
                    <br />
                    <br />
                    If you are on mobile you can <span class="text-accent">SWIPE</span> from <span class="text-accent">left</span> to <span class="text-accent">right</span> to navigate.
                </p>
            </div>
        </div>
    {/if}
</div>
<EditSpriteModal 
    show={showEditSpriteModal}
    on:close={() => showEditSpriteModal = false}
/>
<ExportSpritesModal 
    show={showExportSpritesModal}
    on:close={() => showExportSpritesModal = false}
/>
<ImportSpriteModal 
    show={showImportSpriteModal}
    on:close={() => {showImportSpriteModal = false}}
/>
<CompileSpriteModal
    show={showCompileSpriteModal}
    on:close={() => {showCompileSpriteModal = false}}
/>
<GoToTop />
<SnackbarComponentModule />
<!-- {/if} -->

<script context="module">
    export const prerender = true;
</script>

<script lang="ts">
import { onMount, onDestroy } from 'svelte';

import * as sprEditorStore from './sprEditor.store';
import type { SpriteEditorStore } from './sprEditor.store';

import Nav from './_Nav.svelte';
import Menu from './_menu.svelte';
import Side from './_side.svelte';
import Main from './_main.svelte';
import EditSpriteModal from './_edit_sprite_modal.svelte';
import ExportSpritesModal from './_export_sprites_modal.svelte';
import ImportSpriteModal from './_import_sprite_modal.svelte';
import CompileSpriteModal from './_compile_sprite_modal.svelte';
import MobileDrawer from './_mobile_drawer.svelte';
import GoToTop from '$lib/components/GoToTop.component.svelte';
import Pagination from '$lib/components/Pagination.svelte';
import SnackbarComponentModule from '$lib/components/singletons/Snackbar.component.svelte';
import { Sprite } from '$lib/sprite/Sprite';
import { createSnackbar } from '../store/Snackbar.store';
import { getNominalSpritesPerPage } from './sprEditor.lib';
import { SpritesContainer } from '$lib/sprite/SpritesContainer';

import '../app.css';
import '../assets/ots-font.css';
import '../assets/neutral_face-font.css';
import '../assets/boxicons.min.css';

let hasLoadedSprites : boolean = false;
let hasGeneratedCompressedPixels : boolean = false;
let keydownFn : any;
let mouseClickFn : any;
let searchStr : string = "";
let showEditSpriteModal : boolean = false;
let showExportSpritesModal : boolean = false;
let showImportSpriteModal : boolean = false;
let showCompileSpriteModal : boolean = false;
let showDrawer : boolean = false;

//Pagination
let startIndex : number = 0;
let endIndex : number = 0;
let sprCount : number = 0;


const unsub = sprEditorStore.subscribe((store : SpriteEditorStore) => {
    hasLoadedSprites = store.hasLoadedSprites;
    hasGeneratedCompressedPixels = store.hasGeneratedCompressedPixels;
    startIndex = store.spritesToShowStartIndex;
    endIndex = store.spritesToShowEndIndex;
    sprCount = store.sprCount;
});



const onEditSprite = (sprite : Sprite) => {
    sprEditorStore.update((store:SpriteEditorStore) => {
        store.activeSprite = sprite;
        return store;
    })

    showEditSpriteModal = true;
}

const onFilter = (e : any) => {
    if (e.detail.value === 'empty'){
        if (hasGeneratedCompressedPixels){
            sprEditorStore.update((store : SpriteEditorStore) => {
                store.spritesToShow = store.sprites.filter((sprite) => sprite.isEmpty === true).slice(0, 500);
                return store;
            });
        }else{
            createSnackbar({ message: `Sorry, app is not ready to filter yet.` });
        }
    }else{
        sprEditorStore.update((store : SpriteEditorStore) => {
            store.spritesToShow = store.sprites.slice(store.spritesToShowStartIndex, store.spritesToShowEndIndex);
            return store;
        });
    }
}

const onDoSearch = () => {
    if (searchStr != ""){
        sprEditorStore.update((store : SpriteEditorStore) => {
            store.spritesToShow = store.sprites.filter((sprite) => sprite.id.toString().includes(searchStr)).slice(0, 100);
            return store;
        });
    }else{
        //Reset
        sprEditorStore.update((store : SpriteEditorStore) => {
            store.spritesToShow = store.sprites.slice(store.spritesToShowStartIndex, store.spritesToShowEndIndex);
            return store;
        });
    }
}

const onCreateNew = () => {
    const spritesContainer = new SpritesContainer();
    const sprite = new Sprite(1, new Uint8Array(4096));
    sprite.generateCompressedPixels();
    spritesContainer.addSprite(sprite);

    sprEditorStore.reset();
    sprEditorStore.update((store : SpriteEditorStore) => {
            store.sprites = spritesContainer.array;
            store.spritesToShow = spritesContainer.array;
            store.sprSignature = spritesContainer.signature;
            store.version = spritesContainer.version,
            store.sprCount = store.sprites.length;
            store.hasLoadedSprites = true;
            store.hasGeneratedCompressedPixels = true;
            store.isOldVersion = false;
            return store;
        });
}



onMount(() => {
    sprEditorStore.update((store : SpriteEditorStore) => {
        store.SPRITES_PER_PAGE = getNominalSpritesPerPage();
        return store;
    })

    keydownFn = (e:any) => {
        if (e.code === 'ArrowRight'){
            sprEditorStore.nextPage();
        }
        else if(e.code === 'ArrowLeft'){
            sprEditorStore.prevPage();
        }
        else if(e.code === 'KeyF'){
            sprEditorStore.firstPage();
        }
        else if(e.code === 'KeyL'){
            sprEditorStore.lastPage();
        }
    }

    window.addEventListener('keydown', keydownFn);

    mouseClickFn = (e:any) => {
        e.preventDefault();
    }

    window.addEventListener('contextmenu', mouseClickFn);
});

onDestroy(() => {
    unsub();
    if (typeof window !== 'undefined'){
        window.removeEventListener('keydown', keydownFn);
        window.removeEventListener('mousedown', mouseClickFn);
    }
});
</script>