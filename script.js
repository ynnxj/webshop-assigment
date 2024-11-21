// Procuts
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
        alt: "En beskrivning här"
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
        alt: "En beskrivning här"
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
        alt: "En beskrivning här"
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
        alt: "En beskrivning här"
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
        alt: "En beskrivning här"
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
        alt: "En beskrivning här"
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
        alt: "En beskrivning här"
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
        alt: "En beskrivning här"
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
        alt: "En beskrivning här"
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
        alt: "En beskrivning här"
        },
    },    
];

const productsListDiv = document.querySelector("#products-list");

function renderProducts() {
    productsListDiv.innerHTML = ""; // Clear the existing product list
    
    products.forEach(product => { // Print products
        productsListDiv.innerHTML += `
        <article class="product">
        <h3>${product.name}</h3>
        <p>${product.price} kr</p>
        <p>Rating: ${getRatingHtml(product.rating)}</p>
        <img src="${product.img.url}">
        <div>
            <button class="subtract" id="${product.id}">-</button>
            <input id="input-${product.id}" type="number" value="${product.amount}" min="0">
            <button class="add" id="${product.id}">+</button>
        </div>`;
    });

    const quantityButtons = document.querySelectorAll("button.add, button.subtract"); // Plus/minus buttons
    quantityButtons.forEach(button => {
        button.addEventListener("click", adjustQuantity);
    });
}

const filterButton = document.querySelectorAll("button.name, button.price, button.rating, button.category");
filterButton.forEach(button => {
    button.addEventListener("click", sortByButton);
});

/**
 * Handles click event for plus and minus button
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

    document.querySelector(`#input-${productId}`).value = products[foundProduct].amount; // skriv ut produktlistan
};

/**
 * Sort by name/price/rating/category
 * @param {Event} e 
 */
function sortByButton(e) {
    if(e.target.classList.contains("name")) {
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
    renderProducts(); // Re-render the products after sorting
}

renderProducts();

/**
 * Stars for rating system
 * @param {Stars} rating 
 * @returns 
 */
function getRatingHtml(rating) {
    console.log(rating)
    let html = "";
    for(let i = 0; i < rating; i++) {
        html += `<span class="material-symbols-outlined">star</span>`;
    }
    return html;
};
