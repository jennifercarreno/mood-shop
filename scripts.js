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

const cart =[]

const obj = {};

console.log(obj)
console.log("************")

//Add Item
function addItem(name, price){
    for(let i = 0; i < cart.length; i++){
        if (cart[i].name === name) {
            cart[i].qty += 1;
            return
            
        }
    }
    const item = {name, price, qty: 1}
    cart.push(item)
}

//Show Items
function showItems() {
    const qty = getQty();
    console.log(`You have ${getQty()} items in your cart`);
    
    for (let i = 0; i < cart.length; i++) {
        console.log(`${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
    }
    
    console.log(`Total in Cart: $${getTotal()}`);

}

// Get Qty 
function getQty(){
    let qty = 0;
    for (let i = 0; i < cart.length; i ++) {
        qty += cart[i].qty;
    }
    return qty;
}

// Get Total
function getTotal(){
    let total = 0;
    for(let i= 0; i < cart.length; i ++){
        total += cart[i].price * cart[i].qty;
    }

    return total.toFixed(2);
}

function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (qty > 0) {
               cart[i].qty -= qty; 
            }
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1);
            }
            return;
        }
    
    }

}

addItem("Apple", 0.99);
addItem("Orange", 1.99);
addItem("Apple", 0.99);
addItem("Apple", 0.99);
addItem("Frisbee", 12.99);

removeItem("Frisbee");
removeItem("Apple", 2);

showItems();
