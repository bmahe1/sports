// ============================================
// CONFIGURATION - BACKEND URL
// ============================================
const BACKEND_URL = "http://sports-backend-env-1.eba-kwmiynem.us-east-1.elasticbeanstalk.com";
const API_URL = `${BACKEND_URL}/api/products`;

// ============================================
// GLOBAL STATE
// ============================================
let allProducts = [];

// ============================================
// LOAD AND DISPLAY PRODUCTS
// ============================================
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        allProducts = await response.json();
        console.log("Loaded products:", allProducts);
        displayProducts(allProducts);
    } catch (err) {
        console.error("Failed to load products", err);
        document.getElementById("product-list").innerHTML = `
            <div style="text-align: center; padding: 40px; color: #d32f2f;">
                <h3>⚠️ Unable to Load Products</h3>
                <p>Error: ${err.message}</p>
                <button onclick="loadProducts()" 
                        style="padding: 10px 20px; background: #008cff; 
                               color: white; border: none; border-radius: 5px;">
                    Retry
                </button>
            </div>
        `;
    }
}

// ============================================
// DISPLAY ALL PRODUCTS (MAIN PAGE)
// ============================================
function displayProducts(products) {
    const list = document.getElementById("product-list");
    
    list.innerHTML = products.map(product => `
        <div class='card' onclick="showProductDetails(${product.id})" 
             style="cursor: pointer;">
            <img src="${product.image}" alt="${product.name}" 
                 onerror="this.src='https://via.placeholder.com/300x200?text=Sports+Gear'"/>
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <p class="click-hint">Click for details →</p>
        </div>
    `).join("");
}

// ============================================
// SHOW SINGLE PRODUCT DETAILS
// ============================================
function showProductDetails(productId) {
    // Find the clicked product
    const product = allProducts.find(p => p.id == productId);
    
    if (!product) {
        alert("Product not found!");
        return;
    }
    
    const list = document.getElementById("product-list");
    
    // Create detailed view
    list.innerHTML = `
        <div class="product-detail-container">
            <button class="back-button" onclick="displayProducts(allProducts)">
                ← Back to All Products
            </button>
            
            <div class="product-detail-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='https://via.placeholder.com/500x350?text=${encodeURIComponent(product.name)}'"/>
                </div>
                
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <p class="product-price">$${product.price}</p>
                    
                    <div class="product-description">
                        <h3>Product Details:</h3>
                        <ul>
                            <li><strong>Product ID:</strong> ${product.id}</li>
                            <li><strong>Category:</strong> ${getProductCategory(product.name)}</li>
                            <li><strong>Material:</strong> Premium Sports Grade</li>
                            <li><strong>Warranty:</strong> 1 Year Manufacturer</li>
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
// HELPER FUNCTIONS
// ============================================
function getProductCategory(productName) {
    if (productName.includes("Football")) return "Team Sports";
    if (productName.includes("Cricket")) return "Bat Sports";
    if (productName.includes("Tennis")) return "Racket Sports";
    return "Sports Equipment";
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id == productId);
    alert(`✅ "${product.name}" has been added to your cart!\nPrice: $${product.price}`);
    // In real app: Update cart state, localStorage, etc.
}

function buyNow(productId) {
    const product = allProducts.find(p => p.id == productId);
    alert(`🚀 Purchasing: "${product.name}"\nTotal: $${product.price}\nRedirecting to checkout...`);
    // In real app: Redirect to checkout page
}

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener("DOMContentLoaded", loadProducts);

// Make functions available globally (for onclick events)
window.showProductDetails = showProductDetails;
window.displayProducts = displayProducts;
window.addToCart = addToCart;
window.buyNow = buyNow;
window.loadProducts = loadProducts;
