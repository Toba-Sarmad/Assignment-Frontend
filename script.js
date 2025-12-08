const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

const cartList = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");


// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const count = cart.length;
    document.getElementById("cartCount").textContent = count;
}

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

        const isFavorite = favorites.some(f => f.id === p.code);

        card.innerHTML = `
            <img src="${p.image_url}">
            <h3>${p.product_name}</h3>
            <p>${p.brands || ''}</p>
            <p>${(p.nutriments?.energy_value || 100) / 10} kr</p>

            <div class="actions">
                <button onclick="addToCart('${p.code}', '${p.product_name}')">Lägg i kundvagn</button>

                <span class="heart ${isFavorite ? 'active' : ''}" 
                      onclick="toggleFavorite('${p.code}', '${p.product_name}', '${p.image_url}')">
                      ❤️
                </span>
            </div>
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
    //renderCart();
    renderCartPopup();
    updateCartCount();
}


//Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    //renderCart();
    renderCartPopup();
    updateCartCount();
}

/*
function renderCart() {
    cartList.innerHTML = "";
    let total = 0;


    cart.forEach((item, index) => {
        total += item.price;


        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} – ${item.price} kr
            <button class="remove-btn" onclick="removeFromCart(${index})">x</button>
        `;
        cartList.appendChild(li);
   })


   totalPriceEl.textContent = `Totalt: ${total.toFixed(2)} kr`;
}
*/

function renderCartPopup() {
    const popupList = document.getElementById("popupCartItems");
    const popupTotal = document.getElementById("popupTotalPrice");

    popupList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ${item.price} kr
            <button class="remove-btn" onclick="removeFromCart(${index}); renderCartPopup();">x</button>
        `;
        popupList.appendChild(li);
    });

    popupTotal.textContent = `Totalt: ${total.toFixed(2)} kr`;
}

// FAVORITER
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function showFavoriteToast(message) {
    const toast = document.getElementById("favorite-toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


function toggleFavorite(id, name, img) {
    const index = favorites.findIndex(f => f.id === id);

    if (index === -1) {
        favorites.push({ id, name, img });
        showFavoriteToast(`❤️ "${name}" har lagts till i favoriter`);
    } else {
        favorites.splice(index, 1);
        showFavoriteToast(`💔 "${name}" togs bort från favoriter`);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayProducts(products);
}

//renderCart();
renderCartPopup();
updateCartCount();
loadCategory("snacks");