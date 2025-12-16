// ============================================
// CONFIGURATION - UPDATE THESE VALUES!
// ============================================

// 1. YOUR ELASTIC BEANSTALK BACKEND URL
// Get this from: Elastic Beanstalk Console → Your Environment → Domain
const BACKEND_URL = "http://sports-env-env.eba-e54e7b2p.us-east-1.elasticbeanstalk.com";
// Example: http://sports-env-env.eba-e54e7b2p.us-east-1.elasticbeanstalk.com

// 2. API ENDPOINT
const API_URL = `${BACKEND_URL}/api/products`;

// ============================================
// LOAD AND DISPLAY PRODUCTS
// ============================================

async function loadProducts() {
    const productList = document.getElementById("product-list");
    
    // Show loading state
    productList.innerHTML = `
        <div class="loading" style="text-align: center; padding: 40px;">
            <p>Loading products...</p>
        </div>
    `;
    
    try {
        console.log(`Fetching products from: ${API_URL}`);
        
        // Fetch products from Elastic Beanstalk backend
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors' // Important for cross-origin requests
        });
        
        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse JSON response
        const result = await response.json();
        
        // Check if we got valid data
        if (result && Array.isArray(result)) {
            // If your API returns the array directly
            displayProducts(result);
            console.log(`Successfully loaded ${result.length} products`);
        } else if (result && result.data && Array.isArray(result.data)) {
            // If your API returns {data: [...]}
            displayProducts(result.data);
            console.log(`Successfully loaded ${result.data.length} products`);
        } else {
            throw new Error("Invalid response format from server");
        }
        
    } catch (error) {
        console.error("Error loading products:", error);
        
        // Show error message to user
        productList.innerHTML = `
            <div class="error" style="text-align: center; padding: 40px; color: #d32f2f;">
                <h3>⚠️ Unable to Load Products</h3>
                <p>Error: ${error.message}</p>
                <p>Please check:</p>
                <ul style="text-align: left; display: inline-block;">
                    <li>Backend server is running</li>
                    <li>CORS is properly configured</li>
                    <li>Network connection is stable</li>
                </ul>
                <button onclick="loadProducts()" style="margin-top: 20px; padding: 10px 20px; background: #008cff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Retry
                </button>
                <p><small>Backend URL: ${API_URL}</small></p>
            </div>
        `;
    }
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    
    if (!products || products.length === 0) {
        productList.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p>No products available</p>
            </div>
        `;
        return;
    }
    
    // Create product cards
    productList.innerHTML = products.map(product => `
        <div class='card'>
            <img src="${product.image}" alt="${product.name}" 
                 onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'" />
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
        </div>
    `).join("");
}

// Load products when page loads
document.addEventListener("DOMContentLoaded", function() {
    loadProducts();
    
    // Add refresh button functionality if you have one
    document.getElementById('refresh-btn')?.addEventListener('click', loadProducts);
});

// Export for testing
window.loadProducts = loadProducts;
window.API_URL = API_URL;
