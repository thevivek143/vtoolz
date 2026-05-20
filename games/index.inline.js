// ============================================================
// VIBOX ARCADE — Game Hub Controller
// ============================================================

(function () {
    "use strict";

    const grid = document.getElementById("gamesGrid");
    const searchInput = document.getElementById("gameSearch");
    const categoryTabs = document.getElementById("categoryTabs");
    const sectionTitle = document.getElementById("sectionTitle");
    const gameCount = document.getElementById("gameCount");
    const pills = categoryTabs.querySelectorAll(".ga-pill");

    let allGames = [];
    let currentFilter = "all";
    let searchTerm = "";

    // Category display names
    const CAT_LABELS = {
        all: "All Games", arcade: "Arcade", action: "Action",
        puzzle: "Puzzle", strategy: "Strategy", word: "Word Games",
        idle: "Idle", casual: "Casual", sports: "Sports"
    };

    // Emoji fallbacks by category
    const CAT_EMOJIS = {
        arcade: "🕹️", action: "⚡", puzzle: "🧩",
        strategy: "♟️", word: "📝", idle: "🍪",
        casual: "✌️", sports: "⚽"
    };

    // ---- Load Games ----
    async function loadGames() {
        try {
            const res = await fetch("data/games-config.json", { cache: "no-cache" });
            if (!res.ok) throw new Error("HTTP " + res.status);
            allGames = await res.json();
            updatePillCounts();
            renderGames(allGames);
        } catch (e) {
            grid.innerHTML = '<div class="ga-empty"><i class="fas fa-triangle-exclamation"></i><h3>Could not load games</h3><p>Please refresh the page.</p></div>';
        }
    }

    // ---- Update category counts ----
    function updatePillCounts() {
        pills.forEach(pill => {
            const cat = pill.dataset.cat;
            const count = cat === "all"
                ? allGames.length
                : allGames.filter(g => g.category.toLowerCase() === cat).length;
            // Remove old count span if exists
            let countSpan = pill.querySelector(".ga-pill-count");
            if (!countSpan) {
                countSpan = document.createElement("span");
                countSpan.className = "ga-pill-count";
                pill.appendChild(countSpan);
            }
            countSpan.textContent = count;
        });
    }

    // ---- Render Grid ----
    function renderGames(games) {
        grid.innerHTML = "";
        gameCount.textContent = games.length + " Game" + (games.length === 1 ? "" : "s");

        if (games.length === 0) {
            grid.innerHTML = '<div class="ga-empty"><i class="fas fa-ghost"></i><h3>No games found</h3><p>Try a different search or category.</p></div>';
            return;
        }

        games.forEach((game, i) => {
            const card = document.createElement("a");
            card.className = "ga-card";
            card.href = "play.html?id=" + game.id;
            card.style.animationDelay = Math.min(i * 30, 400) + "ms";

            const catClass = "ga-cat-" + (game.category || "arcade").toLowerCase();
            const emoji = CAT_EMOJIS[game.category] || "🎮";

            let thumbHTML;
            if (game.image) {
                thumbHTML =
                    '<div class="ga-thumb">' +
                        '<img src="' + game.image + '" alt="' + game.name + '" loading="lazy">' +
                        '<span class="ga-cat-badge ' + catClass + '">' + (game.category || "game") + '</span>' +
                        '<div class="ga-play-overlay"><div class="ga-play-btn"><i class="fas fa-play"></i></div></div>' +
                    '</div>';
            } else {
                thumbHTML =
                    '<div class="ga-thumb">' +
                        '<span class="ga-thumb-emoji">' + emoji + '</span>' +
                        '<span class="ga-cat-badge ' + catClass + '">' + (game.category || "game") + '</span>' +
                        '<div class="ga-play-overlay"><div class="ga-play-btn"><i class="fas fa-play"></i></div></div>' +
                    '</div>';
            }

            card.innerHTML = thumbHTML +
                '<div class="ga-details">' +
                    '<div class="ga-name">' + game.name + '</div>' +
                    '<div class="ga-desc">' + (game.description || "") + '</div>' +
                '</div>';

            grid.appendChild(card);
        });
    }

    // ---- Filter logic ----
    function filterGames() {
        const filtered = allGames.filter(g => {
            const matchesTerm = !searchTerm || g.name.toLowerCase().includes(searchTerm) ||
                (g.description && g.description.toLowerCase().includes(searchTerm));
            const matchesCat = currentFilter === "all" || g.category.toLowerCase() === currentFilter;
            return matchesTerm && matchesCat;
        });

        // Update title
        sectionTitle.textContent = CAT_LABELS[currentFilter] || "All Games";
        if (searchTerm) sectionTitle.textContent = 'Search: "' + searchTerm + '"';

        renderGames(filtered);
    }

    // ---- Events ----
    pills.forEach(pill => {
        pill.addEventListener("click", function () {
            pills.forEach(p => p.classList.remove("active"));
            this.classList.add("active");
            currentFilter = this.dataset.cat;
            filterGames();
        });
    });

    searchInput.addEventListener("input", function () {
        searchTerm = this.value.toLowerCase().trim();
        filterGames();
    });

    // Ctrl+K search focus
    document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            searchInput.focus();
        }
    });

    // ---- Init ----
    loadGames();
})();
