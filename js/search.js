const searchText = document.getElementById("searchText");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("searchResults");
const searchableElements = document.querySelectorAll("h1, h2, h3, p, li");

function openSearch() {
  searchText.style.display = "none";
  searchInput.style.display = "inline-block";
  searchInput.focus();
}

function closeSearch() {
  searchInput.value = "";
  searchInput.style.display = "none";
  searchText.style.display = "inline";
  resultsContainer.innerHTML = "";
}

function getCategory(tag) {
  if (tag.startsWith("H")) return "Heading";
  if (tag === "P") return "Paragraph";
  if (tag === "LI") return "List Item";
  return "Content";
}

function searchContent() {
  const query = searchInput.value.trim().toLowerCase();
  resultsContainer.innerHTML = "";

  if (!query) return;

  searchableElements.forEach(el => {
    if (!el.innerText.toLowerCase().includes(query)) return;

    const card = document.createElement("div");
    card.className = "result-card";

    // find image near content
    const img = el.closest("section, div")?.querySelector("img");
    const imgHTML = img ? `<img src="${img.src}" />` : "";

    card.innerHTML = `
      ${imgHTML}
      <div class="card-body">
        <span class="tag">${getCategory(el.tagName)}</span>
        <p>${el.innerText.substring(0, 90)}...</p>
      </div>
    `;

    card.onclick = () => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      closeSearch();
    };

    resultsContainer.appendChild(card);
  });
}

/* Close when clicking outside */
document.addEventListener("click", e => {
  if (!document.querySelector(".search-wrapper").contains(e.target)) {
    closeSearch();
  }
});
