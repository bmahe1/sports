fetch("products.json")
    .then(response => response.json())
    .then(products => {
        const list = document.getElementById("product-list");
        list.innerHTML = products.map(product => `
            <div class='card'>
                <img src="${product.image}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
            </div>
        `).join("");
    })
    .catch(err => console.error("Failed to load products", err));
