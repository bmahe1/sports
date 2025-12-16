// ============================================
// CONFIGURATION - BACKEND URL
// ============================================
const BACKEND_URL = "http://sports-backend-env-1.eba-kwmiynem.us-east-1.elasticbeanstalk.com";
const API_URL = `${BACKEND_URL}/api/products`;

// ============================================
// LOAD AND DISPLAY PRODUCTS
// ============================================
fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(products => {
        console.log("Products loaded:", products);
        const list = document.getElementById("product-list");
        
        list.innerHTML = products.map(product => `
            <div class='card'>
                <img src="${product.image}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
            </div>
        `).join("");
    })
    .catch(err => {
        console.error("Failed to load products", err);
        const list = document.getElementById("product-list");
        list.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #d32f2f;">
                <h3>⚠️ Unable to Load Products</h3>
                <p>Error: ${err.message}</p>
                <button onclick="window.location.reload()" 
                        style="margin-top: 10px; padding: 8px 16px; 
                               background: #008cff; color: white; 
                               border: none; border-radius: 4px;">
                    Retry
                </button>
            </div>
        `;
    });
