import { Item } from './classes/item'

export const createTags = (todoPar: Item, todoDiv: HTMLDivElement) => {
    const itemTag = document.createElement('p');
    itemTag.innerHTML = todoPar.item;
    todoDiv.prepend(itemTag);
    
    crossOut(itemTag, todoPar)
    checker(itemTag, todoPar);
};

const checker = (motherElement: HTMLParagraphElement, todoPar: Item) =>{
    const checkerButton = document.createElement('input');
    checkerButton.type = 'checkbox';
    checkerButton.checked = todoPar.completed;
    motherElement.appendChild(checkerButton);

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
};