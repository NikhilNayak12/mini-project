let box = document.querySelector(".box");
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.products.forEach((product) => {
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                `;
      box.appendChild(card);
    });
  })
  .catch((err) => console.log(err));

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value;
  console.log(query);
  
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  searchInput.value = "";
});
