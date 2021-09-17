import data from './data.js';

const itemsContainer = document.querySelector('#items');

for (let i = 0; i < data.length; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.className = 'item';

    const img = document.createElement('img');
    img.src = data[i].image;
    img.width = 300;
    img.height = 300; 
    newDiv.appendChild(img);
    
    const desc = document.createElement('P');
    desc.innerText = data[i].desc;
    newDiv.appendChild(desc);
    
    const price = document.createElement('P');
    price.innerText = data[i].price;
    newDiv.appendChild(price);

    const button = document.createElement('button');
    button.id = data[i].name;
    button.dataset.price = data[i].price;
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button);
    
    itemsContainer.appendChild(newDiv);
}