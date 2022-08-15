export class Item{
    static allItems : Item[] = [];
    public completed: boolean;
    readonly item: string;

    constructor(item: string){
        this.item = item;
        this.completed = false;
        Item.addToAllItems(this);
    };

    static addToAllItems(item: Item){
        return Item.allItems.push(item)
    };
}
