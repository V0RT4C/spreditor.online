import { writable } from 'svelte/store';

export const { subscribe, update } : any = writable({
    list: []
});

export const createSnackbar : any = (opts : { message: string, duration?: number, icon?: string, color?: string, textColor?: string }) : void => {
    if (!opts.message){
        return;
    }

    let timeout : number = opts.duration ? opts.duration : 3000;
    let id : number = Date.now();

    update((store : any) => {
        store.list = [...store.list, { 
            id, 
            icon: opts.icon ? opts.icon : '',
            color: opts.color ? opts.color : '',
            textColor: opts.textColor ? opts.textColor : '',
            message: opts.message 
        }];

        return store;
    });
    
    deleteAfterTimeout(id, timeout);
}

export const removeSnackbar : any = (id : number) : void => {
    update((store : any) => {
        store.list = store.list.filter((item : any) => item.id != id);
        return store;
    });
}

const deleteAfterTimeout = (id : number, timeout : number = 3000) => {
    let timeoutFn : any = setTimeout(() => {
        update((store : any) => {
            store.list = store.list.filter((item : any) => item.id != id);
            return store;
        });

        clearTimeout(timeoutFn);
    }, timeout);
}