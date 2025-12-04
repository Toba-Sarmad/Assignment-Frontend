const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const cartList = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");


// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];


//API endpoints per kategori
const categoryAPI = {
    snacks: "https://world.openfoodfacts.org/api/v2/search?categories_tags=snacks",
    milk: "https://world.openfoodfacts.org/api/v2/search?categories_tags=milk",
    bread: "https://world.openfoodfacts.org/api/v2/search?categories_tags=bread",
    fruits: "https://world.openfoodfacts.org/api/v2/search?categories_tags=fruits",
    meat: "https://world.openfoodfacts.org/api/v2/search?categories_tags=meat",
    drinks: "https://world.openfoodfacts.org/api/v2/search?categories_tags=beverages",
};

let products = [];

// FETCH PRODUCTS BY CATEGORY
async function loadCategory(cat) {
    const url = categoryAPI[cat];
    const res = await fetch(url);
    const data = await res.json();


    // filtrerar bort tomma produkter
    products = data.products
        .filter(p => p.product_name && p.image_url)
        .slice(0, 20);


    displayProducts(products);
}


function displayProducts(list) {
    productList.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("card");

        

        card.innerHTML = `
            <img src="${p.image_url}">
            <h3>${p.product_name}</h3>
            <p>${p.brands || ''}</p>
            <p>${(p.nutriments?.energy_value || 100) / 10} kr</p>
        `;

        productList.appendChild(card);
    });
}

//SEARCH
searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();


    const filtered = products.filter(p =>
        (p.product_name || "").toLowerCase().includes(q)
    );


    displayProducts(filtered);
});


//CATEGORY CLICK
document.querySelectorAll("nav button").forEach(btn => {
    btn.addEventListener("click", () => {
        searchInput.value = ""; //reset search
        loadCategory(btn.dataset.cat);
    });
});


//Cart System
function addToCart(id, name) {
    cart.push({ id, name, price: 29.90 });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}


//Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}


function renderCart() {
    cartList.innerHTML = "";
    let total = 0;


    cart.forEach((item, index) => {
        total += itemm.price;


        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} – ${item.price} kr
            <button class="remove-btn" onclick="removeFromCart(${index})">x</button>
        `;
        cartList.appendChild(li);
   })


   totalPriceEl.textContent = `Totalt: ${total.toFixed(2)} kr`;
}