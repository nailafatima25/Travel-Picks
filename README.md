✈️ Travel Picks — Destination Explorer & Itinerary Planner

A front-end web application to browse popular travel destinations, filter by travel style, view 3-day itineraries, and save your favorites — all in the browser.

📋 Table of Contents

What Is This?
Highlights
How It Was Built
How To Run Locally
How To Use
Challenges & Bugs Fixed
Future Ideas
Demo Video
Connect With Me


What Is This?
Travel Picks is a responsive front-end web app that lets users explore a curated list of popular travel destinations. Each destination has a description, travel vibe, best time to visit, category tags, and a full 3-day itinerary. Users can search by keyword, filter by travel style (adventure, family, budget, etc.), save favorites, and view detailed itineraries in a pop-up modal — all without any page reloads.
This project was built entirely with vanilla HTML, CSS, and JavaScript — no frameworks required.

✨ Highlights

🔍 Live search — filter destinations as you type by name, country, vibe, or description
🏷️ Category filter — sort by Most Wanted, Most Desired, Budget-Friendly, Family, or Adventure
🗺️ 3-day itineraries — each destination has a structured day-by-day plan in a modal popup
💾 Save favorites — saved destinations persist in your browser using localStorage
📱 Fully responsive — works on desktop, tablet, and mobile screens
⚡ No frameworks — built with pure HTML, CSS, and JavaScript


🛠 How It Was Built
This project was built using only HTML, CSS, and JavaScript. Here is how each part was developed:

HTML structure — the page is divided into a header with search controls, a destinations section, a saved favorites section, and a modal overlay for itineraries.
CSS styling — a responsive card grid uses CSS Grid with breakpoints for mobile and tablet. The modal uses position: fixed with a semi-transparent backdrop. All components use a clean, minimal design system.
JavaScript data — all 5 destinations are stored as an array of objects, each containing name, country, tags, vibe, best time, description, 3-day itinerary, and travel tips.
Search & filter logic — the render() function filters the destinations array based on the current search input and selected category, then rebuilds the card grid dynamically.
Modal system — clicking "View Itinerary" populates the modal with that destination's data and makes it visible. Clicking outside or on Close hides it.
localStorage — saved destination IDs are stored in the browser so favorites persist between sessions.

Tools used: HTML5, CSS3, JavaScript (ES6), browser localStorage API, CSS Grid, Flexbox.

🌐 Live Demo (replace with your real URL)


🎮 How To Use

Browse — scroll through the destination cards on the main page
Search — type a city name, country, or keyword like "food" or "mountains" in the search bar
Filter — use the dropdown to filter by category (Adventure, Family, Budget, etc.)
View Itinerary — click the blue "View Itinerary" button on any card to see a full 3-day plan and travel tips
Save — click "Save" on a card or inside the modal to add it to your Favorites section
Remove — click "Remove" in the Saved section to unsave a destination


🐛 Challenges & Bugs Fixed

Modal closing on outside click — initially the modal would stay open if the user clicked the backdrop. Fixed by checking if e.target === modalBackdrop before calling closeModal().
Save button not updating — after saving from the modal, the card's "Save" button still showed "Save" instead of "Saved". Fixed by calling render() after every toggleSave() to refresh all button states.
Empty state visibility — the "No saved destinations yet" message would sometimes show even when cards were present. Fixed by toggling the hidden class based on the filtered array length after every render.
Search not clearing filter — changing the category dropdown didn't reset the search text. Fixed by making both the search input and category select both trigger the same render() function.


🚀 Future Ideas

Add more destinations with real photos and Google Maps links
Connect to a travel API for live flight prices or weather data
Add a trip planner where users can drag and rearrange itinerary days
Build a backend to let users create accounts and sync saved destinations across devices


🎬 Demo Video

📽️ Click here to watch the demo walkthrough
(Replace this link with your Loom or screen recording URL)
