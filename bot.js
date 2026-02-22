// =====================================
//      TRICHY TOURISM – FINAL BOT.JS
// =====================================

// -------------------------------------
// TEXT NORMALIZATION UTILITIES
// -------------------------------------
function normalizeText(s) {
    return (s || "")
        .toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

// Levenshtein distance
function levenshtein(a, b) {
    a = a || "";
    b = b || "";
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;

    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }
    return dp[m][n];
}

// similarity: 0..1
function similarity(a, b) {
    a = normalizeText(a);
    b = normalizeText(b);
    if (!a && !b) return 1;

    const d = levenshtein(a, b);
    const maxLen = Math.max(a.length, b.length, 1);
    return 1 - d / maxLen;
}

// -------------------------------------
// BUILD ALIAS INDEX (FAST LOOKUP)
// -------------------------------------
const AliasIndex = (() => {
    const list = [];

    for (const place of trichyData.places) {
        const aliases = new Set();

        aliases.add(normalizeText(place.name));

        if (place.also_known_as)
            place.also_known_as.forEach(a => aliases.add(normalizeText(a)));

        if (place.keywords)
            place.keywords.forEach(k => aliases.add(normalizeText(k)));

        aliases.add(
            normalizeText(place.name.replace(/\btemple|church|park|dam/gi, "").trim())
        );

        for (const a of aliases) list.push({ alias: a, place });
    }
    return list;
})();

// -------------------------------------
// FUZZY PLACE RESOLVER
// -------------------------------------
function resolvePlace(msg) {
    msg = normalizeText(msg);
    if (!msg) return null;

    let best = null;
    let bestScore = 0;

    for (const entry of AliasIndex) {
        const score = similarity(msg, entry.alias);
        if (score > bestScore && score >= 0.45) {
            best = entry.place;
            bestScore = score;
        }
    }
    return best;
}

// -------------------------------------
// DISTANCE HELPERS
// -------------------------------------
function findDistanceKey(placeName) {
    const t = trichyData.distances;
    placeName = normalizeText(placeName);

    for (const key of Object.keys(t)) {
        let clean = key.replace(/^from_/, "").replace(/_/g, " ");
        clean = normalizeText(clean);

        if (clean === placeName || clean.includes(placeName) || placeName.includes(clean))
            return key;
    }
    return null;
}

function getSortedNearby(key) {
    const row = trichyData.distances[key];
    if (!row) return null;

    return Object.entries(row)
        .sort((a, b) => a[1] - b[1])
        .map(([k, km]) => `${k.replace(/_/g, " ")} - ${km} km`);
}

// -------------------------------------
// ROUTE GENERATOR (nearest-first)
// -------------------------------------
function generateRouteFrom(key) {
    const list = getSortedNearby(key);
    if (!list) return null;

    return `<b>Best Route:</b><br>${list.join(" → ")}`;
}

// -------------------------------------
// 1-DAY ITINERARY BUILDER
// -------------------------------------
function buildOneDayItinerary(startPlace) {
    const key = findDistanceKey(startPlace.name);
    if (!key) return `I couldn't find a travel base for ${startPlace.name}.`;

    const nearby = getSortedNearby(key);

    const placesOnly = nearby.map(x => x.split(" - ")[0]);

    return `
        <b>🌅 1-Day Trip Plan from ${startPlace.name}</b><br><br>
        🟢 Start at: <b>${startPlace.name}</b><br><br>
        🟡 Continue visiting in this order:<br>
        ${placesOnly.join(" → ")}<br><br>
        ⭐ This plan is auto-generated using distance + same-route logic.
    `;
}

// -------------------------------------
// PLACE DETAILS FORMATTER
// -------------------------------------
function formatPlace(place) {
    let text = `
        <b>${place.name}</b><br><br>
        ${place.about}<br><br>
    `;

    if (place.location)
        text += `<b>📍 Location:</b> ${place.location}<br><br>`;

    if (place.travel) {
        text += `<b>🧭 Travel:</b><br>`;
        if (place.travel.by_road) text += `🚗 Road: ${place.travel.by_road}<br>`;
        if (place.travel.by_air) text += `✈️ Air: ${place.travel.by_air}<br>`;
        if (place.travel.by_rail) text += `🚆 Rail: ${place.travel.by_rail}<br>`;
    }
    return text;
}

// -------------------------------------
// INTENT DETECTION
// -------------------------------------
function detectIntent(msg) {
    msg = normalizeText(msg);

    if (msg.includes("1 day") || msg.includes("itinerary") || msg.includes("day plan"))
        return "itinerary";

    if (msg.includes("near") || msg.includes("nearby") || msg.includes("closest"))
        return "nearby";

    if (msg.includes("route") || msg.includes("travel") || msg.includes("how to go"))
        return "route";

    if (msg.includes("about") || msg.includes("tell me") || msg.includes("information"))
        return "details";

    return "details";
}

// -------------------------------------
// IRRELEVANT QUESTION FILTER
// -------------------------------------
function isRelevant(msg) {
    msg = normalizeText(msg);

    const tourismWords = ["temple", "park", "dam", "place", "trichy", "tour"];
    return tourismWords.some(w => msg.includes(w));
}

// -------------------------------------
// MAIN BOT REPLY FUNCTION
// -------------------------------------
function getBotReply(message) {
    if (!isRelevant(message))
        return "I can answer only Trichy tourism–related questions.";

    const intent = detectIntent(message);
    const place = resolvePlace(message);

    // --- Details ---
    if (intent === "details") {
        if (place) return formatPlace(place);
        return "I couldn't find that place. Please try another name.";
    }

    // --- Nearby ---
    if (intent === "nearby") {
        if (!place) return "Please specify a proper place to show nearby attractions.";

        const key = findDistanceKey(place.name);
        if (!key) return "No nearby data available for this place.";

        const list = getSortedNearby(key);
        return `<b>Nearby places from ${place.name}:</b><br><br>${list.join("<br>")}`;
    }

    // --- Route ---
    if (intent === "route") {
        if (!place) return "Please tell me a valid starting place.";

        const key = findDistanceKey(place.name);
        if (!key) return "I cannot determine a route from that place.";

        return generateRouteFrom(key);
    }

    // --- 1-Day Itinerary ---
    if (intent === "itinerary") {
        if (!place)
            return "Tell me the starting place. Example: '1 day plan from Srirangam'";

        return buildOneDayItinerary(place);
    }

    return "Sorry, I couldn't understand that.";
}

// -------------------------------------
// UI HANDLING
// -------------------------------------

function addMessageToUI(text, sender) {
    const box = document.getElementById("chatBox");
    const div = document.createElement("div");
    div.className = sender;
    div.innerHTML = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;

    if (sender === "bot") {
        const speech = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ""));
        window.speechSynthesis.speak(speech);
    }
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessageToUI(text, "user");
    input.value = "";

    const reply = getBotReply(text);
    addMessageToUI(reply, "bot");
}
