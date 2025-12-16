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
        displayProducts(allProducts);
    } catch (err) {
        console.error("Failed to load products", err);
        document.getElementById("product-list").innerHTML = `
            <div style="text-align: center; padding: 40px; color: #d32f2f;">
                <h3>⚠️ Unable to Load Products</h3>
                <p>Error: ${err.message}</p>
                <button onclick="loadProducts()">Retry</button>
            </div>
        `;
    }
}

function displayProducts(products) {
    const list = document.getElementById("product-list");
    
    list.innerHTML = products.map(product => `
        <div class='card' onclick="showProductDetails(${product.id})" 
             style="cursor: pointer; transition: transform 0.2s;"
             onmouseover="this.style.transform='scale(1.02)'"
             onmouseout="this.style.transform='scale(1)'">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p><small>Click for details →</small></p>
        </div>
    `).join("");
}

// ============================================
// SHOW PRODUCT DETAILS
// ============================================
function showProductDetails(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const list = document.getElementById("product-list");
    
    list.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto;">
            <button onclick="displayProducts(allProducts)" 
                    style="margin-bottom: 20px; padding: 10px 20px; 
                           background: #008cff; color: white; 
                           border: none; border-radius: 5px; cursor: pointer;">
                ← Back to Products
            </button>
            
            <div class='card' style="text-align: center;">
                <img src="${product.image}" alt="${product.name}" 
                     style="max-height: 400px; object-fit: contain;" />
                <h2>${product.name}</h2>
                <p style="font-size: 1.5em; color: #2ecc71; font-weight: bold;">
                    Price: $${product.price}
                </p>
                <p><strong>Product ID:</strong> ${product.id}</p>
                <p>Premium quality sports equipment for professional use.</p>
                
                <button onclick="addToCart(${product.id})" 
                        style="margin-top: 20px; padding: 15px 30px; 
                               background: #2ecc71; color: white; 
                               border: none; border-radius: 8px; 
                               font-size: 1.1em; cursor: pointer;">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// ============================================
// ADD TO CART FUNCTION
// ============================================
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    alert(`✅ ${product.name} added to cart! Price: $${product.price}`);
    // In a real app, you would update cart state here
}

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener("DOMContentLoaded", loadProducts);
