let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
let container = document.getElementById("historyContainer");

// Sort history by most recent
history.sort((a, b) => b.time - a.time);

history.forEach((item) => {
    let div = document.createElement("div");
    div.className = "history-item";

    //Convert timestamp to readable format
    let date = new Date(item.time);
    let formattedTime = date.toLocaleString();

    div.innerHTML = `
        <strong>${item.query}</strong><br>
        <span class="time">${formattedTime}</span>
        <hr>
    `;

    div.addEventListener("click", () => {
        window.location.href = `search.html?q=${encodeURIComponent(item.query)}`;
    });
    container.appendChild(div);
});

//clear history feature
const clearBtn = document.getElementById("clearHistoryBtn");
function clearHistory() {
    localStorage.removeItem("searchHistory");
    container.innerHTML = "";
};
