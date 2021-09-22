import data from './data.js';

const itemsContainer = document.querySelector('#items');

const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const cart = [];

//display product information (gif, name, price, desc)
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
    button.innerHTML = "Add to Cart";
    newDiv.appendChild(button);

    itemsContainer.appendChild(newDiv);
}

//handle clicks on list
itemList.onclick = function (e) {

    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name;
        console.log(name);
        removeItem(name);

    } else if (e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name;
        addItem(name);
        showCart();

    } else if (e.target && e.target.classList.contains('remove-one')) {
        const name = e.target.dataset.name;
        removeItem(name, 1);
    }

}

//handles change on input
itemList.onchange = function (e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name;
        const qty = parseInt(e.target.value);
        updateCart(name, qty);
    }

}

const obj = {}
console.log(obj)
console.log("************")

//Add Item
function addItem(name, price) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty += 1;
            console.log(cart[i].qty);
            return;
        }
    }
    const item = { name, price, qty: 1 };
    cart.push(item);
    showCart();
}

//Show Items
function showItems() {

    const all_items_button = Array.from(document.querySelectorAll("button"));
    console.log(all_items_button);

    all_items_button.forEach(elt => elt.addEventListener('click', () => {
        addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    }))
    for (let i = 0; i < cart.length; i++){
        if (!all_items_button[0]) {
            showCart();
        }
    }

}

// Get Qty 
function getQty() {
    let qty = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name != "open"){
          qty += cart[i].qty;  
        }
        
    }
    return qty;
}

// Get Total
function getTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
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
            //showItems();
            showCart();
            return;
        }

    }
  
}

function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (qty < 1) {
                removeItem(name);
                return;
            }
            cart[i].qty = qty;
            //showItems();
            showCart();
            return;
        }

    }

}

function showCart() {
    // let itemUl = document.createElement('ol')
    let itemStr = '';

    for (let i = 0; i < cart.length; i++) {
        //console.log(`${cart[i].name} $${cart[i].price} x ${cart[i].qty}`);
        const name = cart[i].name;
        console.log(name)
        const price = cart[i].price;
        const qty = cart[i].qty;

        if (name != "open"){
            cartQty.innerHTML = `You have ${getQty()} items in your cart`;

            itemStr  += `<li> 
            ${name} $${price} x ${qty} = ${qty * price}
            <button class="remove" data-name="${name}"> Remove </button>
            <button class="add-one" data-name="${name}"> + </button>
            <button class="remove-one" data-name="${name}"> - </button>
            <input class="update" type="number" data-name="${name}">
         </li>`
            cartTotal.innerHTML = `Total in Cart: $${getTotal()}`;

        }

        
        
    }

    itemList.innerHTML = itemStr;
    
    //console.log(`Total in Cart: $${getTotal()}`);
}



showItems();
showCart();


