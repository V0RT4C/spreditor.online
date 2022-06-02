export let SPRITES_PER_LOAD = 50;
export let INITIAL_SPRITES_LOADED = SPRITES_PER_LOAD * 2;

export let getNominalSpritesPerPage = () : number => {
    let nr : number = 50;

    if (window?.innerWidth >= 1280){
        nr = 55;
    }
    else if(window?.innerWidth >= 1024){
        nr = 40;
    }
    else if(window?.innerWidth >= 768){
        nr = 21;
    }
    else if(window?.innerWidth >= 640){
        nr = 18;
    }
    else{
        nr = 16;
    }
    return nr;
}