
Copy

const destinations = [
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    tags: ["most-wanted", "most-desired"],
    vibe: "City, culture, food, tech",
    bestTime: "March–May, Oct–Nov",
    description: "A perfect mix of modern city life and traditional temples, plus amazing food and shopping.",
    itinerary: [
      { day: "Day 1", items: ["Shibuya Crossing", "Harajuku + Takeshita Street", "Meiji Shrine", "Dinner in Shinjuku"] },
      { day: "Day 2", items: ["Asakusa + Senso-ji Temple", "Tokyo Skytree area", "Ueno Park", "Street food snacks"] },
      { day: "Day 3", items: ["TeamLab (or museum)", "Tsukiji outer market", "Ginza walk", "Night views (Tokyo Tower)"] }
    ],
    tips: ["Buy a transit card for easy travel.", "Try a convenience store food tour.", "Keep cash for small shops."]
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    tags: ["most-desired"],
    vibe: "Art, romance, history",
    bestTime: "April–June, Sep–Oct",
    description: "Classic landmarks, museums, cafés, and beautiful neighborhoods to explore on foot.",
    itinerary: [
      { day: "Day 1", items: ["Eiffel Tower area", "Seine River walk", "Champs-Élysées", "Arc de Triomphe"] },
      { day: "Day 2", items: ["Louvre Museum", "Tuileries Garden", "Île de la Cité", "Notre-Dame area"] },
      { day: "Day 3", items: ["Montmartre", "Sacré-Cœur", "Local bakery stop", "Evening café time"] }
    ],
    tips: ["Book museum tickets ahead.", "Use comfortable walking shoes.", "Visit neighborhoods, not just landmarks."]
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    tags: ["most-wanted", "family"],
    vibe: "Luxury, shopping, attractions",
    bestTime: "Nov–Mar",
    description: "Modern skyline, malls, desert experiences, and family-friendly attractions.",
    itinerary: [
      { day: "Day 1", items: ["Burj Khalifa area", "Dubai Mall", "Fountain show", "Dinner with a view"] },
      { day: "Day 2", items: ["Desert safari", "Camel ride (optional)", "Sunset photos", "Traditional food"] },
      { day: "Day 3", items: ["Beach morning", "Old Dubai + souks", "Museum visit", "Evening city walk"] }
    ],
    tips: ["Plan outdoor activities in cooler hours.", "Use metro for easy travel.", "Dress respectfully in public spaces."]
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Türkiye",
    tags: ["budget", "most-desired"],
    vibe: "History, markets, views",
    bestTime: "Apr–May, Sep–Oct",
    description: "Historic sites, beautiful mosques, markets, and iconic views over the Bosphorus.",
    itinerary: [
      { day: "Day 1", items: ["Hagia Sophia area", "Blue Mosque", "Sultanahmet walk", "Local dessert stop"] },
      { day: "Day 2", items: ["Grand Bazaar", "Spice Market", "Bosphorus ferry", "Sunset viewpoint"] },
      { day: "Day 3", items: ["Galata Tower area", "Neighborhood cafés", "Museum time", "Night market walk"] }
    ],
    tips: ["Carry small cash for markets.", "Go early to avoid lines.", "Try local street foods safely."]
  },
  {
    id: "banff",
    name: "Banff",
    country: "Canada",
    tags: ["adventure", "most-wanted"],
    vibe: "Mountains, lakes, hiking",
    bestTime: "Jun–Sep (hiking), Dec–Feb (snow)",
    description: "Stunning lakes, mountain views, and outdoor adventures for nature lovers.",
    itinerary: [
      { day: "Day 1", items: ["Lake Louise", "Short scenic hike", "Photography spots", "Relax in town"] },
      { day: "Day 2", items: ["Moraine Lake (seasonal)", "Gondola ride", "Local trails", "Hot drink stop"] },
      { day: "Day 3", items: ["Drive scenic route", "Easy viewpoint stops", "Picnic lunch", "Evening stroll"] }
    ],
    tips: ["Check weather and trail updates.", "Bring layers.", "Start early for parking and crowds."]
  }
];
 
const cardsEl = document.getElementById("cards");
const savedCardsEl = document.getElementById("savedCards");
const emptyStateEl = document.getElementById("emptyState");
const savedEmptyStateEl = document.getElementById("savedEmptyState");
 
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
 
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalSaveBtn = document.getElementById("modalSaveBtn");
const modalTitle = document.getElementById("modalTitle");
const modalIntro = document.getElementById("modalIntro");
const itineraryGrid = document.getElementById("itineraryGrid");
const modalTips = document.getElementById("modalTips");
 
let currentModalDestinationId = null;
 
function loadSaved() {
  const raw = localStorage.getItem("savedDestinations");
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
 
function saveSaved(ids) {
  localStorage.setItem("savedDestinations", JSON.stringify(ids));
}
 
function isSaved(id) {
  return loadSaved().includes(id);
}
 
function tagLabel(tag) {
  const map = {
    "most-wanted": "Most Wanted",
    "most-desired": "Most Desired",
    "budget": "Budget",
    "family": "Family",
    "adventure": "Adventure"
  };
  return map[tag] || tag;
}
 
function makeCard(dest, { inSavedSection = false } = {}) {
  const card = document.createElement("div");
  card.className = "card";
 
  const badgesHTML = dest.tags
    .map(t => `<span class="badge">${tagLabel(t)}</span>`)
    .join("");
 
  card.innerHTML = `
    <div class="card-top">
      <div>
        <h3>${dest.name}</h3>
        <div class="country">${dest.country}</div>
      </div>
      <div class="badges">${badgesHTML}</div>
    </div>
    <p class="desc">${dest.description}</p>
    <div class="meta">
      <span><strong>Vibe:</strong> ${dest.vibe}</span>
      <span><strong>Best time:</strong> ${dest.bestTime}</span>
    </div>
    <div class="btn-row">
      <button class="btn primary" data-action="itinerary">View Itinerary</button>
      <button class="btn" data-action="save">${isSaved(dest.id) ? "Saved" : "Save"}</button>
      ${inSavedSection ? `<button class="btn danger" data-action="remove">Remove</button>` : ""}
    </div>
  `;
 
  card.querySelector('[data-action="itinerary"]').addEventListener("click", () => openModal(dest.id));
  card.querySelector('[data-action="save"]').addEventListener("click", () => toggleSave(dest.id));
 
  if (inSavedSection) {
    card.querySelector('[data-action="remove"]').addEventListener("click", () => removeSaved(dest.id));
  }
 
  return card;
}
 
function render() {
  const q = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
 
  const filtered = destinations.filter(d => {
    const matchesSearch =
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.vibe.toLowerCase().includes(q);
 
    const matchesCategory = category === "all" || d.tags.includes(category);
    return matchesSearch && matchesCategory;
  });
 
  cardsEl.innerHTML = "";
  filtered.forEach(d => cardsEl.appendChild(makeCard(d)));
 
  emptyStateEl.classList.toggle("hidden", filtered.length !== 0);
 
  renderSaved();
}
 
function renderSaved() {
  const savedIds = loadSaved();
  const savedDestinations = destinations.filter(d => savedIds.includes(d.id));
 
  savedCardsEl.innerHTML = "";
  savedDestinations.forEach(d => savedCardsEl.appendChild(makeCard(d, { inSavedSection: true })));
 
  savedEmptyStateEl.classList.toggle("hidden", savedDestinations.length !== 0);
}
 
function toggleSave(id) {
  const saved = loadSaved();
  if (saved.includes(id)) {
    // already saved -> do nothing
  } else {
    saved.push(id);
    saveSaved(saved);
  }
  render();
}
 
function removeSaved(id) {
  const saved = loadSaved().filter(x => x !== id);
  saveSaved(saved);
  renderSaved();
  render();
}
 
function openModal(id) {
  const dest = destinations.find(d => d.id === id);
  if (!dest) return;
 
  currentModalDestinationId = id;
 
  modalTitle.textContent = dest.name + " — Sample Itinerary";
  modalIntro.textContent = "A simple 3-day plan with flexible ideas. Vibe: " + dest.vibe;
 
  itineraryGrid.innerHTML = "";
  dest.itinerary.forEach(function(block) {
    const day = document.createElement("div");
    day.className = "day";
    const items = block.items.map(function(x) { return "<li>" + x + "</li>"; }).join("");
    day.innerHTML = "<h4>" + block.day + "</h4><ul>" + items + "</ul>";
    itineraryGrid.appendChild(day);
  });
 
  modalTips.innerHTML = "";
  dest.tips.forEach(function(t) {
    const li = document.createElement("li");
    li.textContent = t;
    modalTips.appendChild(li);
  });
 
  modalSaveBtn.textContent = isSaved(id) ? "Saved" : "Save Destination";
  modalBackdrop.classList.remove("hidden");
}
 
function closeModal() {
  modalBackdrop.classList.add("hidden");
  currentModalDestinationId = null;
}
 
closeModalBtn.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
 
modalSaveBtn.addEventListener("click", () => {
  if (!currentModalDestinationId) return;
  if (!isSaved(currentModalDestinationId)) {
    toggleSave(currentModalDestinationId);
    modalSaveBtn.textContent = "Saved";
  }
});
 
searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);
 
// Initial render
render();
 
