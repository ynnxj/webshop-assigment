
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
]


/* -------------------------------------------------------------------------- */
/*                          ICONS, BUTTONS AND ARROWS                         */
/* -------------------------------------------------------------------------- */

// Arrow button scrolling down to next section
document.querySelector(".arrow").addEventListener("click", function () {
    const nextSection = document.querySelector(".products-section");
    nextSection.scrollIntoView({
        behavior: "smooth"
    });
});

// Home button going back to top
document.querySelector(".home-button").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
    });
});

function updateCartBadge() {
    const totalQuantity = products.reduce((total, product) => total + (product.cartAmount || 0), 0);
    const badge = document.getElementById("cart-badge");
  
    if (totalQuantity > 0) {
      badge.textContent = totalQuantity; // Update number
    } 
  }

/* -------------------------------------------------------------------------- */
/*                              DARK MODE TOGGLE                              */
/* -------------------------------------------------------------------------- */

const toggleButton = document.querySelector("#darkModeToggle");

/**
 * Dark/Light mode button based on click.
 * Toggle between dark and light mode.
 */
function updateButtonText() {
  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "light_mode";
  } else {
    toggleButton.textContent = "dark_mode";
  }
}

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  updateButtonText();
});

/* -------------------------------------------------------------------------- */
/*                     DISPLAY PRODUCTS AND SET UP BUTTONS                    */
/* -------------------------------------------------------------------------- */

const productsListDiv = document.querySelector("#products-list");
const cart = document.querySelector("#cart-summary");

/**
 * Prints all products on the page.
 * Prints different prices on weekdays vs weekends.
 * Creates HTML for each product.
 * Adds even listeners for plus, minus and add to cart buttons.
 */
function printProductsList() {
    productsListDiv.innerHTML = ""; // Clear the existing product list
    const weekend = isWeekend();

    products.forEach(product => {
        
        const displayPrice = weekend ? (product.price * 1.15).toFixed(2) : product.price.toFixed(2);

        productsListDiv.innerHTML += `
        <article class="product">
            <img src="${product.img.url}" alt="${product.img.alt}">
            <h3>${product.name}</h3>
            <p>${displayPrice} kr</p>
            <p class="rating-stars">Betyg: ${getRatingHtml(product.rating)}</p>
            <div class="quantity-buttons">
            
                <div>
                    <button class="subtract" id="${product.id}">−</button>
                    <input id="input-${product.id}" type="number" value="${product.amount}" min="0">
                    <button class="add" id="${product.id}">+</button>
                <div>

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
}

/**
 * Checks if today's date and time is between
 * friday 3pm and monday 3am.
 * @returns 
 */
function isWeekend() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    // Friday after 3pm
    if (day === 5 && hour >= 15) {
        return true;
    }
    
    // Saturday
    if (day === 6) {
        return true;
    }

    // Sunday
    if (day === 0) {
        return true;
    }

    // Monday before 3am
    if (day === 1 && hour < 3) {
        return true;
    }

    return false;
}


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
    if(e.target.classList.contains("name")) {
        products.sort((product1, product2) => product1.name.localeCompare(product2.name));
    }
    else if(e.target.classList.contains("price")) {
        products.sort((product1, product2) => product1.price - product2.price);
    }
    else if(e.target.classList.contains("rating")) {
        products.sort((product1, product2) => product2.rating - product1.rating);
    }
    else if(e.target.classList.contains("category")) {
        products.sort((product1, product2) => product1.category.localeCompare(product2.category));
    }
    printProductsList();
}
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
    updateCartBadge();
}


/* -------------------------------------------------------------------------- */
/*                                SHOPPING CART                               */
/* -------------------------------------------------------------------------- */

// Hide/show preview cart w/ cart icon click
const cartIcon = document.querySelector("#cart-icon");
const previewCart = document.querySelector("#preview-cart");

cartIcon.addEventListener("click", () => {
    previewCart.classList.toggle("hidden");
});


/**
 * Moves selected product amount to cart.
 * Resets the selected amount.
 * Display an updated cart.
 * @param {Event} e triggered by the Add to Cart button click
 */
function handleAddToCart(e) {
    const productId = Number(e.target.id.split("-")[1]); 
    const product = products.find(product => product.id === productId);

    if (product) {
        product.cartAmount = (product.cartAmount || 0) + product.amount; // Update cart amount
        product.amount = 0; 

        document.querySelector(`#input-${productId}`).value = product.amount;
        updateAndPrintCart();
        updateCheckoutPage();
        updateCartBadge();
    }
}


/**
 * Filters out products with a cart amount of 0.
 * Clears the cart display on page.
 * Lists each product in the card with its quantity and total price.
 * Calculates and display the subtotal of the cart content and day.
 */
function updateAndPrintCart() {
    const purchasedProducts = products.filter((product) => product.cartAmount > 0);
    previewCart.innerHTML = ""; // Clears the div ("Din varukorg är tom.")

    let subTotal = 0;
    let totalQuantity = 0;

    previewCart.innerHTML += `<span class="title-text">Varukorg</span>`;
    
    purchasedProducts.forEach(product => {
        let finalPrice = product.price;
        const weekend = isWeekend();

        // 10% off if more than 10+ of same product in cart
        if (product.cartAmount >= 10) {
            finalPrice = product.price * 0.9; 
        }

        // Apply weekend surcharge
        else if (weekend === true) {
           finalPrice = product.price * 1.15;
        }

        const totalProductPrice = finalPrice * product.cartAmount;
        subTotal += totalProductPrice;
        totalQuantity += product.cartAmount; // Update total quantity

        previewCart.innerHTML += 
        `<div class="product-in-preview">
            ${product.name}: ${product.cartAmount} st - ${totalProductPrice.toFixed(2)} kr
        </div>`;
    });

    // Calculate the shipping cost
    const shippingCost = calculateShippingCost(subTotal, totalQuantity);

    // Display the subtotal and shipping cost
    previewCart.innerHTML += `<p>Delsumma: ${subTotal.toFixed(2)} kr</p>`;
    previewCart.innerHTML += `<p>Frakt: ${shippingCost.toFixed(2)} kr</p>`;

    const totalWithShipping = subTotal + shippingCost;

    previewCart.innerHTML += `<p>Totalt: ${totalWithShipping.toFixed(2)} kr</p>`;

    // To-checkout button
    previewCart.innerHTML += 
    `<button id="to-checkout-button" class="to-checkout-button">
        Till Varukorgen
    </button>`;

    const toCheckoutButton = document.querySelector("#to-checkout-button");

    toCheckoutButton.addEventListener("click", function() {
        const checkoutPage = document.querySelector("#checkout-section"); 
        checkoutPage.scrollIntoView({
            behavior: "smooth"
        });
    });
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
        html += `<span class="material-symbols-outlined star">kid_star</span>`;
    }
    return html;
}


/* -------------------------------------------------------------------------- */
/*                       CHECKOUT SUMMARY AND DISCOUNTS                       */
/* -------------------------------------------------------------------------- */

/**
 * Checks in today's date is monday.
 * Checks if time is before 10am.
 * Adds discount if true.
 * @param {*} subTotal
 * @returns 
 */
function mondayDiscount(subTotal) {
    const now = new Date();
    const monday = now.getDay() === 1; 
    const before10Am = now.getHours() < 10; // Before 10:00

    if (monday && before10Am) {
        const discount = subTotal * 0.10; // 10% off
        return discount;
    }
    return 0;
}

const productsInCart = document.querySelector("#checkout-cart");

/**
 * Adds 10% discount for 10 of the same product in cart.
 * Adds 25 kr shipping cost.
 * Free shipping when 15+ products in cart.
 * Calculates the sum based on discounts, surcharges and shipping.
 * Creates HTML for products and total sum added in checkout cart.
 */
function updateCheckoutPage() {
    const purchasedProducts = products.filter((product) => product.cartAmount > 0);

    productsInCart.innerHTML = ""; // Clear existing html ("Din varukorg är tom.")

    let subTotal = 0;
    let totalQuantity = 0;

    purchasedProducts.forEach(product => {
        let finalPrice = product.price; 
        const weekend = isWeekend();

        // Apply 10% discount if 10+ of same product
        if (product.cartAmount >= 10) {
            finalPrice = product.price * 0.9;
        }

        // Apply weekend surcharge
        else if (weekend === true) {
            finalPrice = product.price * 1.15;
        }

        const totalProductPrice = finalPrice * product.cartAmount;
        subTotal += totalProductPrice;
        totalQuantity += product.cartAmount;

        productsInCart.innerHTML += `
            <li class="checkout-products">
                <span>${product.name}</span>
                <span>${product.cartAmount} st</span>
                <span>${finalPrice.toFixed(2)} kr</span>
                <span>${totalProductPrice.toFixed(2)} kr</span>
            </li>`;
    });

    // Calculate the shipping cost
    const shippingCost = calculateShippingCost(subTotal, totalQuantity);

    // Calculate subtotal
    const discount = mondayDiscount(subTotal);
    const totalWithDiscount = subTotal - discount;
    const totalWithShipping = totalWithDiscount + shippingCost;

    productsInCart.innerHTML += `
    <li>
        <span>Delsumma: ${subTotal.toFixed(2)} kr</span>
    </li>`;

    if (discount > 0) {
        productsInCart.innerHTML += `
        <li>
            <span>Måndagsrabatt: -${discount.toFixed(2)} kr</span>
        </li>`
    }

    productsInCart.innerHTML += `
    <li>
        <span>Frakt: ${shippingCost.toFixed(2)} kr</span>
    </li>`;

    productsInCart.innerHTML += `
    <li>
        <span>Totalt: ${totalWithShipping.toFixed(2)} kr</span>
    </li>`;
}

/**
 * Calculates shipping cost based on cart content.
 * Free shipping when 15+ products in cart.
 * 25 standard shipping.
 * @param {number} subTotal 
 * @param {number} totalQuantity 
 * @returns Shipping cost
 */
function calculateShippingCost(subTotal, totalQuantity) {
    if (totalQuantity >= 15) {
        return 0; // Free shipping if 15+ products in cart
    }
    else {
        return 25; // 25 kr shipping cost
    }
}


/* -------------------------------------------------------------------------- */
/*                               PAYMENT OPTIONS                              */
/* -------------------------------------------------------------------------- */

// Elements for customer input
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const postalAddress = document.querySelector("#postal-address");
const postalCode = document.querySelector("#postal-code");
const postalTown = document.querySelector("#postal-town");
const phone = document.querySelector("#phone-number");
const email = document.querySelector("#email-address");

// Elements for invoice and card
const personalId = document.querySelector("#personal-id");
const cardNumber = document.querySelector("#card-number");
const cardYear = document.querySelector("#card-year");
const cardMonth = document.querySelector("#card-month");
const cardCvc = document.querySelector("#card-cvc");

// Elements for toggling payment options
const invoiceOption = document.querySelector("#invoice");
const cardOption = document.querySelector("#card");

// Order Button
const orderButton = document.querySelector("#order-button")


// Default payment method
let selectedPaymentMethod = "card";

// Add event listeners
const inputs = [firstName, lastName, postalAddress, postalCode, postalTown, phone, email, 
    cardNumber, cardYear, cardMonth, cardCvc, personalId];

inputs.forEach(input => {
    input.addEventListener("focusout", activateOrderButton);
    input.addEventListener("change", activateOrderButton);
});

// Switch payment method
const radios = Array.from(document.querySelectorAll('input[name="payment-option"]'));

radios.forEach(radioButton => {
    radioButton.addEventListener("change", switchPaymentMethod);
});

/**
 * Switches between payment method.
 * Toggles visability of input fields.
 * @param {Event} e Event triggered by selecting payment method
 */
function switchPaymentMethod(e) { 
    invoiceOption.classList.toggle("hidden");
    cardOption.classList.toggle("hidden");
    selectedPaymentMethod = e.target.value; // Update selected method
}


/* -------------------------------------------------------------------------- */
/*                  CONDITIONS FOR ORDER BUTTON AVAILABILITY                  */
/* -------------------------------------------------------------------------- */

// RegEx
const personalIdRegEx = new RegExp(/^\d{6,8}[-|(\s)]{0,1}\d{4}$/); // Swedish ID-number
const cardNumberRegEx = new RegExp(/^5[1-5][0-9]{14}$/); // MasterCard
const postalAddressRegEx = new RegExp(/^[A-Za-zÅÄÖåäö0-9\s,.-]{3,100}$/); // Swedish Address
const postalCodeRegEx = new RegExp(/^\d{3}\s?\d{2}$/); // Swedish Postal code
const phoneNumberRegEx = new RegExp(/^((\+|00)46|0)7[02369][0-9]{7}$/); // Swedish Phonenumber

/**
 * Match RegEx with personal ID
 * @returns 
 */
function isPersonalIdValid() {
    return personalIdRegEx.exec(personalId.value);
}

/**
 * Filters products with cartAmount bigger than 0.
 * Calculates the total amount in cart.
 * @returns
 */
function calculateTotalAmount() {
    const purchasedProducts = products.filter(product => product.cartAmount > 0);
    return purchasedProducts.reduce((total, product) => total + product.cartAmount * product.price, 0);
}

/**
 * Validates user input in payment form.
 * Enable order button if input field is correctly filled
 * and there is atleast one product in cart.
 * Disable invoice as an option if total sum exceeds 800.
 * @returns
 */
function activateOrderButton() {
    const totalAmount = calculateTotalAmount();  // Get the total amount in the cart
    const hasProductsInCart = products.some(product => product.cartAmount > 0);
    const invoiceRadio = document.querySelector('input[value="invoice"]'); // Invoice radio button

    orderButton.setAttribute("disabled", ""); // Disable order button by default

    // Check products in cart
    if (!hasProductsInCart) {
        console.warn("Cart empty.");
        return;
    }

    // Check customer info
    if (!firstName || !lastName.value || !postalAddress.value || 
        !postalCode.value || !postalTown.value || !phone.value || !email.value) {
        console.warn("All customer info fields must be filled.");
        return;
    }

    // Check postal code
    if (postalCodeRegEx.exec(postalCode.value) === null) {
        console.warn("Enter valid postal code.");
        return;
    }

    // Disable invoice option if sum exceeds 800 kr
    if (totalAmount > 800) {
        invoiceRadio.disabled = true; 
    } else {
        invoiceRadio.disabled = false;
    }

    // Invoice validation
    if (selectedPaymentMethod === "invoice") {

        // Check personal ID number
        if (!isPersonalIdValid()) {
            console.warn("Personal ID is not valid.");
            return;
        }
    }

    // Card validation
    else if (selectedPaymentMethod === "card") {

        // Check number
        if (cardNumberRegEx.exec(cardNumber.value) === null) {
            console.warn("Card number is not valid.");
            return;
        }
        
        // Check expiration year
        const today = new Date();
        let year = Number(cardYear.value);
        const validYear = Number(String(today.getFullYear()).substring(2));
    
        if (year > validYear + 2 || year < validYear) {
          console.warn("Year not valid.");
          return;
        }

        // Check expiration month
        let month = cardMonth.value.padStart(2, "0");
        if (Number(month) < 1 || Number(month) > 12) {
            console.warn("Month not valid.");
            return;
        }

        // Check CVC
        if (cardCvc.value.length !== 3) {
          console.warn("CVC not valid.");
          return;
        }
    }

    orderButton.removeAttribute("disabled"); // Enable order button if everything is correct
}


/* -------------------------------------------------------------------------- */
/*                         FORM TIMER AND RESET BUTTON                        */
/* -------------------------------------------------------------------------- */

const resetButton = document.querySelector('input[type="reset"]');
const timeoutMessage = document.querySelector("#timeout-message");
const formInputs = document.querySelectorAll("form input");
let timer;

// Resets both preview cart and checkout cart.
function clearCart() {
    previewCart.innerHTML = "Din varukorg är tom."; 
    productsInCart.innerHTML = "Din varukorg är tom.";
}

// Restarts the 15 min timer
function restartTimer() {

    if (timer) {
        clearTimeout(timer)
    }

    timer = setTimeout (() => {
        clearCart();

        // Timeout message visability
        timeoutMessage.style.display = "block"; // show timeout message

        setTimeout(() => {
            timeoutMessage.style.display = "none"; // hide timeout message
        }, 7000); // 7 sec

        resetButton.click();

    }, 900000); // 15 min
}

// Reset button also clears cart on click
resetButton.addEventListener('click', function(event) {
    clearCart();
});

// Restart timer when there is input changes
formInputs.forEach(element => {
    element.addEventListener("input", restartTimer);
    element.addEventListener("change", restartTimer); 
});


/* -------------------------------------------------------------------------- */
/*                           ORDER CONFIRMATION PAGE                          */
/* -------------------------------------------------------------------------- */

const backButton = document.querySelector("#back-button");
const orderConfirmationPage = document.querySelector("#order-confirmation");
const orderSummary = document.querySelector("#order-summary");

// Print ordered products
orderButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    orderConfirmationPage.classList.remove("hidden");
    document.querySelector("form").reset();
    clearCart();

    document.body.classList.add("order-confirmation-active"); // Add no-scroll to background

    orderSummary.innerHTML += `<h4>Beställda varor</h4>`

    products.forEach(product => {
    if (product.cartAmount > 0) {
        orderSummary.innerHTML += `
            <li class="ordered-products">
                <span>${product.name}</span>
                <span>${product.cartAmount} st</span>
            </li>`;
        }
    });
});

/**
 * Return by reloading page.
 * Remove no-scroll
 */
backButton.addEventListener('click', function() {
    window.scrollTo(0, 0);
    location.reload();

    document.body.classList.remove("order-confirmation-active");
});


