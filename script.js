// ========================================
// OMA'S PANTRY - PRODUCT DATA
// ========================================

const products = [

    {
        name: "Cornflakes",
        image: "images/cornflakes.png",

        sizes: [
            { name: "Small", grams: "", price: 2400 },
            { name: "Large", grams: "", price: 7000 }
        ]
    },

    {
        name: "Coco Pops",
        image: "images/cocopops.png",

        sizes: [
            { name: "Small", grams: "", price: 2900 },
            { name: "Large", grams: "", price: 9500 }
        ]
    },

    {
        name: "Moon & Star",
        image: "images/moon-star.png",

        sizes: [
            { name: "Small", grams: "", price: 2900 },
            { name: "Large", grams: "", price: 9500 }
        ]
    },

    {
        name: "Golden Morn",
        image: "images/goldenmorn.png",

        sizes: [
            { name: "Small", grams: "", price: 2600 },
            { name: "Large", grams: "", price: 8000 }
        ]
    },

    {
        name: "Oat",
        image: "images/oat.png",

        sizes: [
            { name: "Small", grams: "", price: 2700 },
            { name: "Large", grams: "", price: 8500 }
        ]
    },

    {
        name: "Party Chips",
        image: "images/party-chips.png",

        sizes: [
            { name: "Small", grams: "", price: 2700 },
            { name: "Large", grams: "", price: 8000 }
        ]
    },

    {
        name: "Milk",
        image: "images/milk.png",

        sizes: [
            { name: "Small", grams: "", price: 3000 },
            { name: "Large", grams: "", price: 16000 }
        ]
    }

];


// ========================================
// CART
// ========================================

let cart = [];


// ========================================
// DISPLAY PRODUCTS
// ========================================

const productsContainer =
    document.getElementById("products-container");


function displayProducts() {

    productsContainer.innerHTML = "";


    products.forEach(function(product) {

        const productCard =
            document.createElement("div");

        productCard.className = "product-card";


        let sizesHTML = "";


        product.sizes.forEach(function(size) {

            sizesHTML += `

                <div class="product-option">

                    <div>

                        <strong>
                            ${size.name}
                        </strong>

                        <br>

                        <span>
                            ₦${size.price.toLocaleString()}
                        </span>

                    </div>


                    <button
                        onclick="addToCart(
                            '${product.name}',
                            '${size.name}',
                            ${size.price},
                        )"
                    >
                        Add +
                    </button>

                </div>

            `;

        });


        productCard.innerHTML = `

    <div class="product-image">

        <img
            src="${product.image}"
            alt="${product.name}"
        >

    </div>


    <h3>
        ${product.name}
    </h3>


    ${sizesHTML}

`;


        productsContainer.appendChild(productCard);

    });

}


displayProducts();


// ========================================
// ADD TO CART
// ========================================

function addToCart(productName, size, price) {

    const existingItem =
        cart.find(function(item) {

            return (
                item.productName === productName &&
                item.size === size
            );

        });


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            productName: productName,

            size: size,

            price: price,

            quantity: 1,

            image: products.find(
                product => product.name === productName
            ).image

        });

    }


    updateCart();

    openCart();

}


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    updateCartCount();

    displayCart();

}


// ========================================
// CART COUNT
// ========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");


    const totalItems =
        cart.reduce(function(total, item) {

            return total + item.quantity;

        }, 0);


    cartCount.textContent = totalItems;

}


// ========================================
// DISPLAY CART
// ========================================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");


    const cartTotal =
        document.getElementById("cart-total");


    if (!cartItems) {

        return;

    }


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some goodies from our pantry.
                </p>

            </div>

        `;

        cartTotal.textContent = "₦0";

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

    <img
        src="${item.image}"
        alt="${item.productName}"
    >

</div>


            <div class="cart-item-info">

                <h4>
                    ${item.productName}
                </h4>

                <p>
                    ${item.size}
                </p>

                <strong>
                    ₦${item.price.toLocaleString()}
                </strong>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(
                            ${index},
                            -1
                        )"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(
                            ${index},
                            1
                        )"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >
                ×
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        `₦${total.toLocaleString()}`;

}


// ========================================
// CHANGE QUANTITY
// ========================================

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ========================================
// REMOVE ITEM
// ========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ========================================
// OPEN CART
// ========================================

function openCart() {

    const cartDrawer =
        document.getElementById("cart-drawer");


    const cartOverlay =
        document.getElementById("cart-overlay");


    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

}


// ========================================
// CLOSE CART
// ========================================

function closeCart() {

    const cartDrawer =
        document.getElementById("cart-drawer");


    const cartOverlay =
        document.getElementById("cart-overlay");


    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

}
// ========================================
// OPEN CHECKOUT
// ========================================

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add something first! 🛒");

        return;

    }


    const checkoutOverlay =
        document.getElementById("checkout-overlay");


    const checkoutTotal =
        document.getElementById("checkout-total");


    let total = 0;


    cart.forEach(function(item) {

        total += item.price * item.quantity;

    });


    checkoutTotal.textContent =
        `₦${total.toLocaleString()}`;


    checkoutOverlay.classList.add("active");


    closeCart();

}


// ========================================
// CLOSE CHECKOUT
// ========================================

function closeCheckout() {

    const checkoutOverlay =
        document.getElementById("checkout-overlay");


    checkoutOverlay.classList.remove("active");

}


// ========================================
// DELIVERY MESSAGE
// ========================================

function updateDeliveryMessage() {

    const selectedDelivery =
        document.querySelector(
            'input[name="delivery"]:checked'
        );


    const deliveryMessage =
        document.getElementById("delivery-message");


    if (!selectedDelivery) {

        return;

    }


    if (selectedDelivery.value === "RSU") {

        deliveryMessage.innerHTML = `
            🏫 <strong>Free delivery!</strong>
            Since you're within RSU, your delivery is free.
        `;

    } else {

        deliveryMessage.innerHTML = `
            📍 <strong>Outside RSU:</strong>
            You'll need to arrange a dispatch rider
            or pay for dispatch.
        `;

    }

}


// ========================================
// SEND ORDER TO WHATSAPP
// ========================================

document.getElementById("checkout-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        // Get customer information
        const name =
            document.getElementById("customer-name").value.trim();

        const phone =
            document.getElementById("customer-phone").value.trim();

        const location =
            document.getElementById("delivery-location").value.trim();

        const notes =
            document.getElementById("order-notes").value.trim();


        // Get delivery option
        const delivery =
            document.querySelector(
                'input[name="delivery"]:checked'
            );


        // Make sure delivery was selected
        if (!delivery) {

            alert("Please select a delivery option.");

            return;

        }


        // Make sure cart isn't empty
        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }


        // ========================================
        // CREATE WHATSAPP MESSAGE
        // ========================================

        let orderMessage = "";

        orderMessage +=
            "🛍️ *NEW OMA'S PANTRY ORDER* 🛍️\n\n";


        // Customer details

        orderMessage +=
            "👤 *CUSTOMER DETAILS*\n";

        orderMessage +=
            `Name: ${name}\n`;

        orderMessage +=
            `Phone: ${phone}\n`;

        orderMessage +=
            `Delivery: ${delivery.value}\n`;

        orderMessage +=
            `Location: ${location}\n\n`;


        // Order details

        orderMessage +=
            "🛒 *ORDER DETAILS*\n";

        orderMessage +=
            "━━━━━━━━━━━━━━━━\n";


        let total = 0;


        cart.forEach(function(item) {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;


            orderMessage +=
    `🛍️ ${item.productName}\n`;

            orderMessage +=
                `   Size: ${item.size}\n`;

            orderMessage +=
                `   Quantity: ${item.quantity}\n`;

            orderMessage +=
                `   Price: ₦${item.price.toLocaleString()} each\n`;

            orderMessage +=
                `   Subtotal: ₦${itemTotal.toLocaleString()}\n\n`;

        });


        orderMessage +=
            "━━━━━━━━━━━━━━━━\n";


        orderMessage +=
            `💰 *TOTAL: ₦${total.toLocaleString()}*\n`;


        // Additional note

        if (notes !== "") {

            orderMessage +=
                `\n📝 *CUSTOMER NOTE*\n${notes}\n`;

        }


        orderMessage +=
            "\n💕 Thank you for shopping with Oma's Pantry!";


        // ========================================
        // OPEN WHATSAPP
        // ========================================

        const whatsappURL =
            "https://wa.me/2347065751451?text=" +
            encodeURIComponent(orderMessage);


        window.open(
            whatsappURL,
            "_blank"
        );

    });
    // ========================================
// MOBILE MENU
// ========================================

function toggleMenu() {

    const menu = document.getElementById("mobile-menu");

    menu.classList.toggle("active");

}


function closeMenu() {

    const menu = document.getElementById("mobile-menu");

    menu.classList.remove("active");

}
// ========================================
// MOBILE MENU
// ========================================

function toggleMenu() {

    const menu = document.getElementById("mobile-menu");

    menu.classList.toggle("active");

}

function closeMenu() {

    const menu = document.getElementById("mobile-menu");

    menu.classList.remove("active");

}
// ========================================
// MOBILE MENU
// ========================================

function toggleMenu() {
    const menu = document.getElementById("mobile-menu");

    menu.classList.toggle("active");
}

function closeMenu() {
    const menu = document.getElementById("mobile-menu");

    menu.classList.remove("active");
}