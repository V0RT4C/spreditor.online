export class SpriteIdList {
    private _list : number[] = [];

    public addSpriteIds(data : number[]){
        for (let i=0; i < data.length; i++){
            this._list.push(data[i]);
        }
    }

    public addSpriteId(value : number){
        this._list.push(value);
    }

    public get list() : number[] {
        return this._list;
    }
}