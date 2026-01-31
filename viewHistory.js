// Retrieve view history from localStorage
let viewHistory = JSON.parse(localStorage.getItem("viewHistory")) || [];
let container = document.getElementById("viewHistoryContainer");

// Sort history by most recent
viewHistory.sort((a, b) => b.time - a.time);

if (viewHistory.length === 0) {
    container.innerHTML = "<p>No view history yet. Visit some products to see them here!</p>";
} else {
    viewHistory.forEach((item) => {
        let div = document.createElement("div");
        div.className = "history-item";

        // Convert timestamp to readable format
        let date = new Date(item.time);
        let formattedTime = date.toLocaleString();

        div.innerHTML = `
            <div class="view-history-content">
                <img src="${item.thumbnail}" alt="${item.title}" class="history-thumbnail">
                <div class="history-info">
                    <strong>${item.title}</strong><br>
                    <span class="price">$${item.price}</span><br>
                    <span class="time">${formattedTime}</span>
                </div>
            </div>
            <hr>
        `;

        div.addEventListener("click", () => {
            window.location.href = `product.html?id=${item.id}`;
        });
        container.appendChild(div);
    });
}

// Clear view history feature
const clearBtn = document.getElementById("clearViewHistoryBtn");
clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your view history?")) {
        localStorage.removeItem("viewHistory");
        container.innerHTML = "<p>View history cleared!</p>";
        clearBtn.style.display = "none";
    }
});
