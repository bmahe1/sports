const BACKEND_URL = "http://app-1-env.eba-4na5mm5w.us-east-1.elasticbeanstalk.com/";
const API_URL = `${BACKEND_URL}/api/products`;

async function loadProducts() {
    const res = await fetch(API_URL);
    const products = await res.json();

    document.getElementById("product-list").innerHTML =
        products.map(p => `
            <div class="card" onclick="showProductDetails(${p.id})">
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">$${p.price}</p>
            </div>
        `).join("");
}

async function showProductDetails(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const product = await res.json();

    document.getElementById("product-list").innerHTML = `
        <div class="product-detail-container">
            <button class="back-button" onclick="loadProducts()">← Back</button>
            <div class="product-detail-card">
                <div class="product-image">
                    <img src="${product.image}">
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <p class="product-price">$${product.price}</p>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", loadProducts);
