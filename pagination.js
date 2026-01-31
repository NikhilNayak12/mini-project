let currentPage = 1;
let itemsPerPage = 8;
let allProducts = [];

let container = document.getElementById("productList");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let pageInfo = document.getElementById("pageInfo");

fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
        allProducts = data.products;
        if((allProducts.length === 0)){
            container.innerHTML = "<p>No products available.</p>";
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            pageInfo.innerText = "";
            return;
        };
        renderPage();
    });

function renderPage() {
    container.innerHTML = "";

    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    let pageItems = allProducts.slice(start, end);

    pageItems.forEach((product) => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;

        card.addEventListener("click", () => {
            window.location.href = `product.html?id=${product.id}`;
        });

        container.appendChild(card);
    });

    let totalPages = Math.ceil(allProducts.length / itemsPerPage);
    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
    currentPage--;
    renderPage();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

nextBtn.addEventListener("click", () => {
    currentPage++;
    renderPage();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Search functionality
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value;
  console.log(query);
  
  //save to local storage
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.some(item => item.query === query)) {
    history.push({
      query: query,
      time: Date.now()
    });
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }

  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  searchInput.value = "";

});

//suggestions feature
const suggestionBox = document.getElementById("suggestions");
searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase();
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  //Filter based on query field
  const matches = history.filter(item => item.query.toLowerCase().includes(text));

  //clear previous suggestions
  suggestionBox.innerHTML = "";

  //show suggestions
  matches.forEach(item => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = item.query;

    div.addEventListener("click", () => {
      searchInput.value = item.query;
      suggestionBox.innerHTML = "";
    });

    suggestionBox.appendChild(div);
  });
});