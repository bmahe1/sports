// ============================================
// CONFIGURATION
// ============================================
const BACKEND_URL = "http://sports-backend-env-1.eba-kwmiynem.us-east-1.elasticbeanstalk.com";
const API_URL = `${BACKEND_URL}/api/products`;

// ============================================
// GLOBAL STATE
// ============================================
let allProducts = [];

// ============================================
// LOAD PRODUCTS
// ============================================
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (err) {
        document.getElementById("product-list").innerHTML = `
            <h3 style="color:red;text-align:center;">Failed to load products</h3>
        `;
        console.error(err);
    }
}

// ============================================
// DISPLAY PRODUCTS
// ============================================
function displayProducts(products) {
    const list = document.getElementById("product-list");
    list.innerHTML = products.map(p => `
        <div class="card" onclick="showProductDetails(${p.id})">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <p class="click-hint">Click for details →</p>
        </div>
    `).join("");
}

// ============================================
// PRODUCT DETAILS
// ============================================
function showProductDetails(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return alert("Product not found");

    document.getElementById("product-list").innerHTML = `
        <div class="product-detail-container">
            <button class="back-button" onclick="displayProducts(allProducts)">
                ← Back
            </button>

            <div class="product-detail-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="product-info">
                    <h1>${product.name}</h1>
                    <p class="product-price">$${product.price}</p>

                    <div class="product-description">
                        <ul>
                            <li><strong>ID:</strong> ${product.id}</li>
                            <li><strong>Category:</strong> ${getCategory(product.name)}</li>
                            <li><strong>Material:</strong> Sports Grade</li>
                            <li><strong>Warranty:</strong> 1 Year</li>
                        </ul>
                    </div>

                    <div class="action-buttons">
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            🛒 Add to Cart
                        </button>
                        <button class="buy-now-btn" onclick="buyNow(${product.id})">
                            ⚡ Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// HELPERS
// ============================================
function getCategory(name) {
    if (name.includes("Football")) return "Team Sports";
    if (name.includes("Cricket")) return "Bat Sports";
    if (name.includes("Tennis")) return "Racket Sports";
    return "Sports Equipment";
}

function addToCart(id) {
    const p = allProducts.find(p => p.id === id);
    alert(`Added ${p.name} ($${p.price})`);
}

function buyNow(id) {
    const p = allProducts.find(p => p.id === id);
    alert(`Buying ${p.name} ($${p.price})`);
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", loadProducts);

window.showProductDetails = showProductDetails;
window.displayProducts = displayProducts;
window.addToCart = addToCart;
window.buyNow = buyNow;
