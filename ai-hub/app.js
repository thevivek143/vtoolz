// ============================================================
// AI TOOLS HUB — Application Controller
// Vibox Platform · 2026
// ============================================================

(function () {
    "use strict";

    // ---- Tool Database (loaded from ai-hub/data/tools.json) ----
    let DB = [];
    const PAGE_SIZE = 18;

    // ---- Category/Subcategory name maps ----
    const CAT_NAMES = {
        chat: "Writing & Chat", image: "Image Gen", video: "Video & Motion",
        voice: "Voice & Audio", code: "Coding & Tech", productivity: "Productivity"
    };
    const SUB_NAMES = {
        "ai-assistant": "AI Assistants", "seo-copy": "SEO Copywriting", "paraphraser": "Paraphrase & Grammar",
        "text-to-image": "Text to Image", "photo-editor": "Photo Editors", "graphic-design": "Graphic Design",
        "text-to-video": "Text to Video", "avatar-builder": "Avatar Builders", "ai-animator": "AI Animators",
        "voice-cloning": "Voice Cloning", "text-to-speech": "Text to Speech", "music-gen": "Music Gen", "audio-editor": "Audio Editors",
        "ide-companion": "IDE Companions", "code-gen": "Code Generators", "ui-builder": "UI Builders", "dev-search": "Dev Search",
        "ai-search": "AI Search", "presentation": "Presentations", "data-analyst": "Data Analysts", "doc-assistant": "Doc Assistants", "meeting-comp": "Meeting AI"
    };

    // ---- State ----
    let activeCat = "all";
    let activeSub = "";
    let activeFilter = "all";
    let searchQuery = "";
    let favorites = [];
    let visibleLimit = PAGE_SIZE;

    // ---- DOM refs (safe — script loaded at bottom of body) ----
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const elGrid = $("#aihGrid");
    const elSearch = $("#aihSearch");
    const elSidebar = $("#aihSidebar");
    const elTitle = $("#aihTitle");
    const elCount = $("#aihCount");
    const elTabs = $("#aihTabs");
    const elDrawer = $("#aihDrawer");
    const elBackdrop = $("#aihBackdrop");
    const elDrawerScroll = $("#aihDrawerScroll");
    const elModal = $("#aihModal");
    const elDirectory = $("#aihDirectory");
    const elLoadMore = $("#aihLoadMore");

    // ---- Data loading ----
    async function fetchJson(url) {
        const response = await fetch(url, { cache: "no-cache" });
        if (!response.ok) throw new Error(url + " returned HTTP " + response.status);
        return response.json();
    }

    async function loadChunkedTools() {
        const manifest = await fetchJson("data/tools-manifest.json");
        if (!manifest || !Array.isArray(manifest.chunks) || manifest.chunks.length === 0) {
            throw new Error("tools-manifest.json does not list any chunks");
        }

        const chunkLists = await Promise.all(manifest.chunks.map(chunk => fetchJson("data/" + chunk.file)));
        return chunkLists.reduce((all, chunk) => all.concat(Array.isArray(chunk) ? chunk : []), []);
    }

    async function loadTools() {
        try {
            let tools;
            try {
                tools = await loadChunkedTools();
            } catch (chunkError) {
                tools = await fetchJson("data/tools.json");
            }
            if (!Array.isArray(tools)) throw new Error("Tool data must be an array");
            DB = tools;
        } catch (error) {
            elGrid.innerHTML = '<div class="aih-empty"><i class="fas fa-triangle-exclamation"></i><h3>Could not load AI tools</h3><p>Please refresh the page or check ai-hub/data/tools.json.</p></div>';
            throw error;
        }
    }

    // ---- LocalStorage helpers ----
    function loadFavs() {
        try { favorites = JSON.parse(localStorage.getItem("ai_hub_favorites") || "[]"); } catch { favorites = []; }
    }
    function saveFavs() {
        try { localStorage.setItem("ai_hub_favorites", JSON.stringify(favorites)); } catch (e) { /* noop */ }
    }

    // ---- Brand logos ----
    function getToolLogoUrl(tool) {
        if (tool.logo) return tool.logo;
        try {
            const hostname = new URL(tool.url).hostname.replace(/^www\./, "");
            return "https://www.google.com/s2/favicons?domain=" + encodeURIComponent(hostname) + "&sz=128";
        } catch (e) {
            return "";
        }
    }

    function renderToolLogo(tool, extraClass) {
        const logoUrl = getToolLogoUrl(tool);
        const className = "aih-card-icon aih-logo-tile" + (extraClass ? " " + extraClass : "");
        if (!logoUrl) return '<div class="' + className + ' logo-failed"><i class="' + tool.icon + ' aih-logo-fallback"></i></div>';

        return '<div class="' + className + '">' +
            '<img class="aih-tool-logo" src="' + logoUrl + '" alt="' + tool.name + ' logo" loading="lazy" referrerpolicy="no-referrer">' +
            '<i class="' + tool.icon + ' aih-logo-fallback"></i>' +
        '</div>';
    }

    function wireLogoFallback(root) {
        root.querySelectorAll(".aih-tool-logo").forEach(img => {
            img.addEventListener("error", function () {
                const tile = this.closest(".aih-logo-tile");
                if (tile) tile.classList.add("logo-failed");
            }, { once: true });
        });
    }

    function getPriceSlug(price) {
        return String(price || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    function resetVisibleLimit() {
        visibleLimit = PAGE_SIZE;
    }

    // ---- Counts ----
    function updateCounts() {
        const setCount = (id, n) => { const el = document.getElementById(id); if (el) el.textContent = n; };

        setCount("cnt-all", DB.length);
        Object.keys(CAT_NAMES).forEach(cat => setCount("cnt-" + cat, DB.filter(t => t.category === cat).length));
        Object.keys(SUB_NAMES).forEach(sub => setCount("cnt-" + sub, DB.filter(t => t.subcat === sub).length));
    }

    // ---- Filter & Render ----
    function getFiltered() {
        return DB.filter(tool => {
            // 1. Category / subcategory
            if (activeCat !== "all") {
                if (tool.category !== activeCat) return false;
                if (activeSub && tool.subcat !== activeSub) return false;
            }
            // 2. Special filter
            if (activeFilter === "latest" && !tool.isLatest) return false;
            if (activeFilter === "trending" && !tool.isTrending) return false;
            if (activeFilter === "bookmarks" && !favorites.includes(tool.id)) return false;
            if (activeFilter.indexOf("price-") === 0 && getPriceSlug(tool.price) !== activeFilter.replace("price-", "")) return false;
            if (activeFilter.indexOf("alpha-") === 0 && tool.name.charAt(0).toLowerCase() !== activeFilter.replace("alpha-", "")) return false;
            // 3. Search
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const hay = [tool.name, tool.desc, tool.tagline || "", tool.bestFor || "", tool.category, ...tool.tags].join(" ").toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }

    function renderGrid() {
        const filtered = getFiltered();

        // Update title
        let title = "All AI Tools";
        if (activeFilter === "bookmarks") title = "Bookmarked Tools";
        else if (activeFilter === "latest") title = "Latest AI Releases";
        else if (activeFilter === "trending") title = "Trending Top AI";
        else if (activeFilter === "price-free") title = "Free AI Tools";
        else if (activeFilter === "price-freemium") title = "Freemium AI Tools";
        else if (activeFilter === "price-paid") title = "Paid AI Tools";
        else if (activeFilter === "price-free-trial") title = "AI Tools With Free Trial";
        else if (activeFilter.indexOf("alpha-") === 0) title = "AI Tools Starting With " + activeFilter.replace("alpha-", "").toUpperCase();

        if (activeCat !== "all") {
            const catLabel = CAT_NAMES[activeCat] || activeCat;
            if (activeSub) title = (SUB_NAMES[activeSub] || activeSub);
            else title = catLabel;
        }
        elTitle.textContent = title;
        const visibleTools = filtered.slice(0, visibleLimit);
        elCount.textContent = visibleTools.length === filtered.length
            ? filtered.length + " Tool" + (filtered.length === 1 ? "" : "s")
            : "Showing " + visibleTools.length + " of " + filtered.length;

        // Clear & render
        elGrid.innerHTML = "";

        if (filtered.length === 0) {
            elGrid.innerHTML = '<div class="aih-empty"><i class="fas fa-box-open"></i><h3>No tools found</h3><p>Try adjusting filters, clearing search, or saving some bookmarks.</p></div>';
            if (elLoadMore) elLoadMore.classList.add("hidden");
            return;
        }

        visibleTools.forEach((tool, i) => {
            const isFav = favorites.includes(tool.id);
            const card = document.createElement("div");
            card.className = "aih-card aih-cat-" + tool.category + " aih-animate";
            card.style.animationDelay = Math.min(i * 25, 300) + "ms";

            const priceClass = "aih-price-" + getPriceSlug(tool.price);

            card.innerHTML =
                '<div class="aih-card-top">' +
                    renderToolLogo(tool) +
                    '<button class="aih-fav-btn' + (isFav ? " active" : "") + '" data-id="' + tool.id + '" aria-label="Bookmark">' +
                        '<i class="' + (isFav ? "fas" : "far") + ' fa-heart"></i>' +
                    '</button>' +
                '</div>' +
                '<div class="aih-card-body">' +
                    '<h3>' + tool.name + '</h3>' +
                    '<p>' + tool.desc + '</p>' +
                '</div>' +
                '<div class="aih-card-foot">' +
                    '<div class="aih-card-tags">' +
                        '<span class="aih-price ' + priceClass + '">' + tool.price + '</span>' +
                        tool.tags.slice(0, 2).map(t => '<span class="aih-tag">' + t + '</span>').join("") +
                    '</div>' +
                    '<div class="aih-card-arrow"><i class="fas fa-arrow-right"></i></div>' +
                '</div>';

            wireLogoFallback(card);

            // Fav button click
            card.querySelector(".aih-fav-btn").addEventListener("click", function (e) {
                e.stopPropagation();
                toggleFav(tool.id, this);
            });

            // Card click -> open drawer
            card.addEventListener("click", function (e) {
                if (e.target.closest(".aih-fav-btn")) return;
                openDrawer(tool);
            });

            elGrid.appendChild(card);
        });

        if (elLoadMore) {
            elLoadMore.classList.toggle("hidden", visibleTools.length >= filtered.length);
            elLoadMore.innerHTML = '<i class="fas fa-chevron-down"></i> View More (' + (filtered.length - visibleTools.length) + ' left)';
        }

        // Spotlight effect
        elGrid.onmousemove = function (e) {
            var cards = elGrid.querySelectorAll(".aih-card");
            for (var j = 0; j < cards.length; j++) {
                var rect = cards[j].getBoundingClientRect();
                cards[j].style.setProperty("--mx", (e.clientX - rect.left) + "px");
                cards[j].style.setProperty("--my", (e.clientY - rect.top) + "px");
            }
        };
    }

    // ---- Favorites ----
    function toggleFav(id, btn) {
        const idx = favorites.indexOf(id);
        if (idx === -1) {
            favorites.push(id);
            if (btn) { btn.classList.add("active"); btn.innerHTML = '<i class="fas fa-heart"></i>'; }
        } else {
            favorites.splice(idx, 1);
            if (btn) { btn.classList.remove("active"); btn.innerHTML = '<i class="far fa-heart"></i>'; }
        }
        saveFavs();

        // Sync drawer fav button
        const dFav = document.getElementById("aihDFav");
        if (dFav && dFav.dataset.id === id) {
            if (favorites.includes(id)) {
                dFav.classList.add("active");
                dFav.innerHTML = '<i class="fas fa-heart"></i> Bookmarked';
            } else {
                dFav.classList.remove("active");
                dFav.innerHTML = '<i class="far fa-heart"></i> Bookmark';
            }
        }

        // If bookmarks filter is active, re-render
        if (activeFilter === "bookmarks") {
            resetVisibleLimit();
            setTimeout(renderGrid, 200);
        }
    }

    // ---- Drawer ----
    function openDrawer(tool) {
        elDrawer.classList.add("open");
        elBackdrop.classList.add("open");
        document.body.style.overflow = "hidden";

        const isFav = favorites.includes(tool.id);
        const catName = CAT_NAMES[tool.category] || tool.category;

        elDrawerScroll.innerHTML =
            '<div class="aih-d-head">' +
                '<div class="aih-d-icon aih-cat-' + tool.category + '">' + renderToolLogo(tool, "aih-d-logo") + '</div>' +
                '<div class="aih-d-meta">' +
                    '<div class="aih-d-name">' + tool.name + '</div>' +
                    '<div class="aih-d-badges">' +
                        '<span class="aih-d-badge aih-d-badge-cat">' + catName + '</span>' +
                        '<span class="aih-d-badge aih-d-badge-price">' + tool.price + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="aih-d-tagline">"' + (tool.tagline || tool.desc) + '"</div>' +

            '<div class="aih-d-actions">' +
                '<a href="' + tool.url + '" target="_blank" rel="noopener noreferrer" class="aih-d-visit">Visit Website <i class="fas fa-external-link-alt"></i></a>' +
                '<button class="aih-d-fav' + (isFav ? " active" : "") + '" id="aihDFav" data-id="' + tool.id + '">' +
                    '<i class="' + (isFav ? "fas" : "far") + ' fa-heart"></i> ' + (isFav ? "Bookmarked" : "Bookmark") +
                '</button>' +
            '</div>' +

            '<div class="aih-d-section">' +
                '<div class="aih-d-section-title">In-Depth Review</div>' +
                '<p class="aih-d-desc">' + (tool.longDesc || tool.desc) + '</p>' +
            '</div>' +

            '<div class="aih-d-section">' +
                '<div class="aih-d-section-title">Ideal For</div>' +
                '<div class="aih-d-bestfor"><i class="fas fa-bullseye"></i><p>' + (tool.bestFor || "Developers, designers, and creators.") + '</p></div>' +
            '</div>' +

            '<div class="aih-d-section">' +
                '<div class="aih-d-section-title">Key Features</div>' +
                '<ul class="aih-d-features">' +
                    (tool.features || []).map(f => '<li>' + f + '</li>').join("") +
                '</ul>' +
            '</div>' +

            '<div class="aih-d-section">' +
                '<div class="aih-d-section-title">Pros & Cons</div>' +
                '<div class="aih-d-pc-grid">' +
                    '<div class="aih-d-pro">' +
                        '<div class="aih-d-pc-title"><i class="fas fa-check-circle"></i> Pros</div>' +
                        '<ul>' + (tool.pros || []).map(p => '<li>' + p + '</li>').join("") + '</ul>' +
                    '</div>' +
                    '<div class="aih-d-con">' +
                        '<div class="aih-d-pc-title"><i class="fas fa-times-circle"></i> Cons</div>' +
                        '<ul>' + (tool.cons || []).map(c => '<li>' + c + '</li>').join("") + '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>';

        wireLogoFallback(elDrawerScroll);

        // Wire drawer fav
        const dFav = document.getElementById("aihDFav");
        if (dFav) {
            dFav.addEventListener("click", function () {
                toggleFav(tool.id, null);
                // Also update any grid card fav button
                const gridBtn = elGrid.querySelector('.aih-fav-btn[data-id="' + tool.id + '"]');
                if (gridBtn) {
                    if (favorites.includes(tool.id)) {
                        gridBtn.classList.add("active");
                        gridBtn.innerHTML = '<i class="fas fa-heart"></i>';
                    } else {
                        gridBtn.classList.remove("active");
                        gridBtn.innerHTML = '<i class="far fa-heart"></i>';
                    }
                }
            });
        }
    }

    function closeDrawer() {
        elDrawer.classList.remove("open");
        elBackdrop.classList.remove("open");
        document.body.style.overflow = "";
    }

    // ---- Sidebar selection ----
    function handleMenuClick(item) {
        // Clear all active
        $$(".aih-menu-item, .aih-menu-parent, .aih-menu-child").forEach(m => m.classList.remove("active"));
        item.classList.add("active");

        activeCat = item.dataset.cat || "all";
        activeSub = item.dataset.sub || "";
        resetVisibleLimit();
        renderGrid();

        // Close mobile sidebar
        if (window.innerWidth <= 1024) elSidebar.classList.remove("open");
    }

    // ---- Directory shortcuts ----
    function renderDirectory() {
        if (!elDirectory) return;

        const priceItems = [
            ["price-free", "Free AI"],
            ["price-freemium", "Freemium"],
            ["price-paid", "Paid"],
            ["price-free-trial", "Free Trial"]
        ];
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        elDirectory.innerHTML =
            '<div class="aih-dir-block">' +
                '<div class="aih-dir-title">Browse by Category</div>' +
                '<div class="aih-dir-chips">' +
                    Object.keys(CAT_NAMES).map(cat => '<button class="aih-dir-chip" data-cat="' + cat + '" data-sub="">' + CAT_NAMES[cat] + ' <span>' + DB.filter(t => t.category === cat).length + '</span></button>').join("") +
                '</div>' +
            '</div>' +
            '<div class="aih-dir-block">' +
                '<div class="aih-dir-title">Browse by Pricing</div>' +
                '<div class="aih-dir-chips">' +
                    priceItems.map(item => '<button class="aih-dir-chip" data-filter="' + item[0] + '">' + item[1] + ' <span>' + DB.filter(t => item[0] === "price-" + getPriceSlug(t.price)).length + '</span></button>').join("") +
                '</div>' +
            '</div>' +
            '<div class="aih-dir-block">' +
                '<div class="aih-dir-title">Browse by Alphabet</div>' +
                '<div class="aih-alpha-row">' +
                    letters.map(letter => '<button class="aih-alpha-chip" data-filter="alpha-' + letter.toLowerCase() + '">' + letter + '</button>').join("") +
                '</div>' +
            '</div>';

        elDirectory.querySelectorAll("[data-cat]").forEach(btn => {
            btn.addEventListener("click", function () {
                activeCat = this.dataset.cat || "all";
                activeSub = this.dataset.sub || "";
                activeFilter = "all";
                resetVisibleLimit();
                elTabs.querySelectorAll(".aih-tab").forEach(t => t.classList.toggle("active", t.dataset.filter === "all"));
                $$(".aih-menu-item, .aih-menu-parent, .aih-menu-child").forEach(m => m.classList.remove("active"));
                const sidebarMatch = document.querySelector('.aih-menu-parent[data-cat="' + activeCat + '"][data-sub=""]');
                if (sidebarMatch) sidebarMatch.classList.add("active");
                renderGrid();
            });
        });

        elDirectory.querySelectorAll("[data-filter]").forEach(btn => {
            btn.addEventListener("click", function () {
                activeFilter = this.dataset.filter;
                activeCat = "all";
                activeSub = "";
                resetVisibleLimit();
                elTabs.querySelectorAll(".aih-tab").forEach(t => t.classList.toggle("active", t.dataset.filter === activeFilter));
                $$(".aih-menu-item, .aih-menu-parent, .aih-menu-child").forEach(m => m.classList.remove("active"));
                const allItem = document.querySelector('.aih-menu-item[data-cat="all"]');
                if (allItem) allItem.classList.add("active");
                renderGrid();
            });
        });
    }

    // ---- Event Wiring ----
    async function init() {
        loadFavs();
        await loadTools();
        updateCounts();
        renderDirectory();
        renderGrid();

        // Search
        elSearch.addEventListener("input", function () {
            searchQuery = this.value;
            resetVisibleLimit();
            renderGrid();
        });

        // Sidebar items
        $$(".aih-menu-item, .aih-menu-parent, .aih-menu-child").forEach(item => {
            item.addEventListener("click", function (e) {
                e.stopPropagation();
                handleMenuClick(this);
            });
        });

        // Tabs
        elTabs.querySelectorAll(".aih-tab").forEach(tab => {
            tab.addEventListener("click", function () {
                elTabs.querySelectorAll(".aih-tab").forEach(t => t.classList.remove("active"));
                this.classList.add("active");
                activeFilter = this.dataset.filter;
                resetVisibleLimit();
                renderGrid();
            });
        });

        if (elLoadMore) {
            elLoadMore.addEventListener("click", function () {
                visibleLimit += PAGE_SIZE;
                renderGrid();
            });
        }

        // Mobile sidebar
        $("#aihMobileToggle").addEventListener("click", function () { elSidebar.classList.add("open"); });
        $("#aihSidebarClose").addEventListener("click", function () { elSidebar.classList.remove("open"); });

        // Drawer close
        $("#aihDrawerClose").addEventListener("click", closeDrawer);
        elBackdrop.addEventListener("click", closeDrawer);

        // Keyboard shortcuts
        document.addEventListener("keydown", function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                elSearch.focus();
            }
            if (e.key === "Escape") {
                closeDrawer();
                elModal.classList.remove("open");
                if (window.innerWidth <= 1024) elSidebar.classList.remove("open");
            }
        });

        // Submit modal
        $("#aihOpenSubmit").addEventListener("click", function () {
            elModal.classList.add("open");
            $("#aihSubmitForm").classList.remove("hidden");
            $("#aihPayloadResult").classList.add("hidden");
            $("#aihSubmitForm").reset();
        });
        $("#aihModalClose").addEventListener("click", function () { elModal.classList.remove("open"); });
        $("#aihModalCancel").addEventListener("click", function () { elModal.classList.remove("open"); });

        $("#aihSubmitForm").addEventListener("submit", function (e) {
            e.preventDefault();
            var payload = {
                id: "ai-" + $("#sfName").value.trim().toLowerCase().replace(/[^a-z0-9]/g, "-"),
                name: $("#sfName").value.trim(),
                url: $("#sfUrl").value.trim(),
                desc: $("#sfDesc").value.trim(),
                category: $("#sfCat").value,
                price: $("#sfPrice").value,
                icon: "fas fa-brain",
                tags: ["New", "Community"],
                submittedOn: new Date().toISOString().split("T")[0]
            };
            $("#aihPayloadCode").textContent = JSON.stringify(payload, null, 2);
            this.classList.add("hidden");
            $("#aihPayloadResult").classList.remove("hidden");
        });

        $("#aihPayloadCopy").addEventListener("click", function () {
            navigator.clipboard.writeText($("#aihPayloadCode").textContent).then(function () {
                if (window.Utils && window.Utils.showToast) window.Utils.showToast("Copied to clipboard! 📋", "success");
            }).catch(function () { alert("Copy failed. Please select and copy manually."); });
        });

        $("#aihPayloadDone").addEventListener("click", function () { elModal.classList.remove("open"); });
    }

    // Boot
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
