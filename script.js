
/* -------------------------------------------------------------------------- */
/*                          OBJECT ARRAY OF PRODUCTS                          */
/* -------------------------------------------------------------------------- */

const products = [
    {
    id: 0,
    name: "The Classic",
    price: 19,
    amount: 0,
    rating: 4,
    category: "Nötkött",
    img: {
        url: "assets/imgs/the_classic.JPG", 
        width: 100,
        height: 100,
        alt: "En vanlig korv"
        },
    },
    {
    id: 1,
    name: "Hela Gänget",
    price: 29,
    rating: 5,
    amount: 0,
    category: "Fläsk",
    img: {
        url: "assets/imgs/hela_ganget.JPG",
        width: 100,
        height: 100,
        alt: "Korvknyten"
        },
    },
    {
    id: 2,
    name: "Julkransen",
    price: 49,
    amount: 0,
    rating: 4,
    category: "Fläsk",
    img: {
        url: "assets/imgs/jul_kransen.JPG",
        width: 100,
        height: 100,
        alt: "En falukorv med rosett"
        },
    },
    {
    id: 3,
    name: "Stubinen",
    price: 10,
    amount: 0,
    rating: 4,
    category: "Nötkött",
    img: {
        url: "assets/imgs/stubinen.JPG",
        width: 100,
        height: 100,
        alt: "En kort, tjock korv"
        },
    },
    {
    id: 4,
    name: "Long Boy",
    price: 19,
    amount: 0,
    rating: 3,
    category: "Kyckling",
    img: {
        url: "assets/imgs/long_boy.JPG",
        width: 100,
        height: 100,
        alt: "En lång, smal korv"
        },
    },
    {
    id: 5,
    name: "Infinity",
    price: 29,
    amount: 0,
    rating: 4,
    category: "Kyckling",
    img: {
        url: "assets/imgs/infinity.JPG",
        width: 100,
        height: 100,
        alt: "En korv formad som en evighetssymbol"
        },
    },
    {
    id: 6,
    name: "Couch Sausage",
    price: 69,
    amount: 0,
    rating: 5,
    category: "Vego",
    img: {
        url: "assets/imgs/couch_sausage.JPG",
        width: 100,
        height: 100,
        alt: "En säckig, ledsen korv"
        },
    },
    {
    id: 7,
    name: "Wurst Case Scenario",
    price: 19,
    amount: 0,
    rating: 3,
    category: "Vego",
    img: {
        url: "assets/imgs/wurst_case_scenario.JPG",
        width: 100,
        height: 100,
        alt: "En vågig korv"
        },
    },
    {
    id: 8,
    name: "Uzumaki",
    price: 49,
    amount: 0,
    rating: 4,
    category: "Nötkött",
    img: {
        url: "assets/imgs/uzumaki.JPG",
        width: 100,
        height: 100,
        alt: "En korvsnurra"
        },
    },
    {
    id: 9,
    name: "En Knapp",
    price: 19,
    amount: 0,
    rating: 5,
    category: "Merch",
    img: {
        url: "assets/imgs/pin_merch.JPG",
        width: 100,
        height: 100,
        alt: "En pin-knapp med Peepee Poopoo på"
        },
    },    
];

const productsListDiv = document.querySelector("#products-list");
const cart = document.querySelector("#cart-summary");


/* -------------------------------------------------------------------------- */
/*                     DISPLAY PRODUCTS AND SET UP BUTTONS                    */
/* -------------------------------------------------------------------------- */

/**
 * Prints all products on the page.
 * Creates HTML for each product.
 * Adds even listeners for plus, minus and add to cart buttons.
 */
function printProductsList() {
    productsListDiv.innerHTML = ""; // Clear the existing product list

    products.forEach(product => {
        productsListDiv.innerHTML += `
        <article class="product">
            <h3>${product.name}</h3>
            <p>${product.price} kr</p>
            <p>Rating: ${getRatingHtml(product.rating)}</p>
            <img src="${product.img.url}" alt="${product.img.alt}">
            <div>
                <button class="subtract" id="${product.id}">-</button>
                <input id="input-${product.id}" type="number" value="${product.amount}" min="0">
                <button class="add" id="${product.id}">+</button>
                <button class="add-to-cart" id="cart-${product.id}">Lägg i varukorg</button>
            </div>
        </article>`;
    });

    // Add listeners for Plus and Minus buttons
    const quantityButtons = document.querySelectorAll("button.add, button.subtract");
    quantityButtons.forEach(button => {
        button.addEventListener("click", adjustQuantity);
    });

    // Add listeners for Add to Cart buttons
    const cartButtons = document.querySelectorAll("button.add-to-cart");
    cartButtons.forEach(button => {
        button.addEventListener("click", handleAddToCart);
    });
};


/* -------------------------------------------------------------------------- */
/*                                SORT PRODUCTS                               */
/* -------------------------------------------------------------------------- */

const filterButton = document.querySelectorAll("button.name, button.price, button.rating, button.category");
filterButton.forEach(button => {
    button.addEventListener("click", sortByButton);
});

/**
 * Sorts products based on button clicked.
 * Re-prints list after sorting.
 * @param {Event} e triggered by Sort By button
 */
function sortByButton(e) {
    if(e.target.classList.contains("name")) { // note to self: localeCompare bestämmer ordningen på strängar
        products.sort((product1, product2) => product1.name.localeCompare(product2.name));
    }
    else if(e.target.classList.contains("price")) {
        products.sort((product1, product2) => product1.price - product2.price);
    }
    else if(e.target.classList.contains("rating")) {
        products.sort((product1, product2) => product1.rating - product2.rating);
    }
    else if(e.target.classList.contains("category")) {
        products.sort((product1, product2) => product1.category.localeCompare(product2.category));
    }
    printProductsList();
};
printProductsList();

/* -------------------------------------------------------------------------- */
/*                            ADD PRODUCTS TO CART                            */
/* -------------------------------------------------------------------------- */

/**
 * Adjusts and updates the quantity of products when 
 * plus and minus buttons are clicked.
 * Prevents quantity to go below 0.
 * @param {Event} e 
 */
function adjustQuantity(e) {
    const productId = Number(e.target.id);
    const foundProduct = products.findIndex(product => product.id === productId);

    if (e.target.classList.contains("add")) {
        products[foundProduct].amount += 1;
    } else if (e.target.classList.contains("subtract")) {
        products[foundProduct].amount = Math.max(0, products[foundProduct].amount - 1);
    }
    document.querySelector(`#input-${productId}`).value = products[foundProduct].amount; // Print products
};

/* -------------------------------------------------------------------------- */
/*                                SHOPPING CART                               */
/* -------------------------------------------------------------------------- */

/**
 * Filters out products with a cart amount of 0.
 * Clears the cart display on page.
 * Lists each product in the card with its quantity and total price.
 * Calculates and display the subtotal of the cart content.
 */
function updateAndPrintCart() {
    const purchasedProducts = products.filter((product) => product.cartAmount > 0);
    cart.innerHTML = ""; // Clears the div ("Din varukorg är tom.")

    purchasedProducts.forEach(product => {
        cart.innerHTML += 
        `<div>
            ${product.name}: ${product.cartAmount}st - ${product.cartAmount * product.price} kr
        </div>`;
    });

    // Display the subtotal
    const subTotal = purchasedProducts.reduce((sum, product) => sum + (product.cartAmount * product.price), 0);
    cart.innerHTML += `<p>Delsumma: ${subTotal} kr</p>`;
};

/**
 * Moves selected product amount to cart.
 * Resets the selected amount.
 * Display an updated cart.
 * @param {Event} e triggered by the Add to Cart button click
 */
function handleAddToCart(e) {
    const productId = Number(e.target.id.split("-")[1]);  // note to self: ?? what??
    const product = products.find(product => product.id === productId);

    if (product) {
        product.cartAmount = (product.cartAmount || 0) + product.amount; // Update cart amount
        product.amount = 0; 

        document.querySelector(`#input-${productId}`).value = product.amount;
        updateAndPrintCart();
    }
}


/* -------------------------------------------------------------------------- */
/*                                RATING SYSTEM                               */
/* -------------------------------------------------------------------------- */

/**
 * Creates HTML for stars in rating system
 * @param {number} rating rating number value
 * @returns {string} stars in HTML
 */
function getRatingHtml(rating) {
    let html = "";
    for(let i = 0; i < rating; i++) {
        html += `<span class="material-symbols-outlined">star</span>`;
    }
    return html;
};
