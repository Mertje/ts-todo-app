import { Item } from './classes/item'
import { createTags } from './createTag';

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
            createTags(items, todoDiv);
        });
    }
});

submitButton.addEventListener('click', () => { 
    startProcess()
});
inputField.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter') startProcess()
});

function startProcess(){
    if(inputField.value === '') return
    const newTodo = new Item(inputField.value);
    createTags(newTodo, todoDiv);
    inputField.value = '';
}


