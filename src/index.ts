const root = document.querySelector('#root') as HTMLDivElement;
const inputField= document.createElement('input');
const submitButton = document.createElement('button');
const todoDiv = document.createElement('div');

submitButton.type = 'submit';
submitButton.innerHTML = 'Press to log';
submitButton.className = 'submit-button';

inputField.className = 'input-field';
inputField.placeholder = 'Enter todo..';

root.appendChild(inputField)
root.appendChild(submitButton)
root.appendChild(todoDiv)

document.addEventListener("DOMContentLoaded", () => {
    const itemListString = localStorage.getItem('itemList');
    const itemList = itemListString ? JSON.parse(itemListString): undefined;

    if(itemList){
        itemList.forEach((items: Item) => {
            Item.addToAllItems(items);
            createTags(items);
        });
    }
});

submitButton.addEventListener('click', () => {
    const newTodo = new Item(inputField.value);
    createTags(newTodo);
    inputField.value = '';
});

const createTags = (todoPar: Item) => {
    const itemTag = document.createElement('p');
    itemTag.innerHTML = todoPar.item;
    todoDiv.prepend(itemTag);
    
    crossOut(itemTag, todoPar)
    checker(itemTag, todoPar);
}


const checker = (motherElement: HTMLParagraphElement, todoPar: Item) =>{
    const checkerButton = document.createElement('input');
    checkerButton.type = 'checkbox';
    motherElement.appendChild(checkerButton);
    checkerButton.checked = todoPar.completed;

    checkerButton.addEventListener('click', (e) => {
         const checkbox = e.currentTarget as HTMLInputElement;
         todoPar.completed =  checkbox.checked;
         crossOut(motherElement, todoPar);
    });
};

const crossOut = (paraGrapgh: HTMLParagraphElement, todo: Item) => {
    if(todo.completed) {
        paraGrapgh.setAttribute('style', 'text-decoration: line-through;');
    } 
    else{
        paraGrapgh.setAttribute('style', 'text-decoration: none;');
    }
    localStorage.setItem('itemList', JSON.stringify(Item.allItems));
} 

class Item{
    static allItems : Item[] = [];
    completed: boolean;
    item: string;

    constructor(item: string){
        this.item = item;
        this.completed = false;
        Item.addToAllItems(this);
    };

    static addToAllItems(item: Item){
        return Item.allItems.push(item)
    };
}