let param = new URLSearchParams(window.location.search);
let productId = param.get("id");
console.log("Product ID:", productId);

fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
        console.log("Product data:", product);
        
        //Basic info
        document.getElementById("title").innerText = product.title;
        document.getElementById("thumbnail").src = product.thumbnail;
        document.getElementById("description").innerText = product.description;
        document.getElementById("price").innerText = `$${product.price}`;
        document.getElementById("availability").innerText = product.availablityStatus;

        //Details list
        let details = document.getElementById("details");
        details.innerHTML = `
            <li>Brand: ${product.brand}</li>
            <li>Category: ${product.category}</li>
            <li>Rating: ${product.rating}</li>
            <li>Stock: ${product.stock}</li>
            <li>Discount: ${product.discountPercentage}%</li>
            <li>SKU: ${product.sku}</li>
            <li>Weight: ${product.weight} kg</li>
            <li>Dimensions: ${product.dimensions}</li>
            <li>Warranty: ${product.warranty}</li>
            <li>Return Policy: ${product.returnPolicy}</li>
            <li>Shipping Info: ${product.shippingInfo}</li>
            <li>Minimum Order Quantity: ${product.minOrderQty}</li>
        `;
    })
    .catch((err) => console.log(err));
