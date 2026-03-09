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

// -------------------------------------
// GREETING DETECTOR
// -------------------------------------
function detectGreeting(msg) {
    msg = normalizeText(msg);

    const greetings = ["hi", "hello", "hey", "vanakkam"];

    return greetings.some(g => msg.includes(g));
}

// -------------------------------------
// LEVENSHTEIN DISTANCE
// -------------------------------------
function levenshtein(a, b) {
    a = a || "";
    b = b || "";
    const m = a.length, n = b.length;

    const dp = Array.from({ length: m + 1 }, () =>
        new Array(n + 1).fill(0)
    );

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

// -------------------------------------
// SIMILARITY SCORE
// -------------------------------------
function similarity(a, b) {
    a = normalizeText(a);
    b = normalizeText(b);

    const d = levenshtein(a, b);
    const maxLen = Math.max(a.length, b.length, 1);

    return 1 - d / maxLen;
}

// -------------------------------------
// BUILD ALIAS INDEX
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

        for (const a of aliases)
            list.push({ alias: a, place });

    }

    return list;

})();

// -------------------------------------
// PLACE RESOLVER
// -------------------------------------
function resolvePlace(msg) {

    msg = normalizeText(msg);

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
// DISTANCE FUNCTIONS
// -------------------------------------
function findDistanceKey(placeName) {

    const table = trichyData.distances;

    placeName = normalizeText(placeName);

    for (const key of Object.keys(table)) {

        let clean = key.replace("from_", "").replace(/_/g, " ");
        clean = normalizeText(clean);

        if (clean.includes(placeName) || placeName.includes(clean))
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
// ROUTE GENERATOR
// -------------------------------------
function generateRouteFrom(key) {

    const list = getSortedNearby(key);
    if (!list) return null;

    return `<b>Best Route:</b><br>${list.join(" → ")}`;
}

// -------------------------------------
// ONE DAY PLAN
// -------------------------------------
function buildOneDayItinerary(startPlace) {

    const key = findDistanceKey(startPlace.name);
    if (!key) return "No route data available.";

    const nearby = getSortedNearby(key);

    const placesOnly = nearby.map(x => x.split(" - ")[0]);

    return `
<b>🌅 1-Day Trip Plan from ${startPlace.name}</b><br><br>
🟢 Start at: <b>${startPlace.name}</b><br><br>
${placesOnly.join(" → ")}<br><br>
⭐ Plan based on distance optimization.
`;
}

// -------------------------------------
// FORMAT PLACE DETAILS
// -------------------------------------
function formatPlace(place) {

    let text = `<b>${place.name}</b><br><br>${place.about}<br><br>`;

    if (place.location)
        text += `<b>📍 Location:</b> ${place.location}<br><br>`;

    if (place.travel) {

        text += `<b>🧭 Travel:</b><br>`;

        if (place.travel.by_road)
            text += `🚗 Road: ${place.travel.by_road}<br>`;

        if (place.travel.by_air)
            text += `✈️ Air: ${place.travel.by_air}<br>`;

        if (place.travel.by_rail)
            text += `🚆 Rail: ${place.travel.by_rail}<br>`;
    }

    return text;
}

// -------------------------------------
// POPULAR PLACES
// -------------------------------------
function getPopularPlaces() {

    const list = trichyData.places
        .slice(0, 5)
        .map(p => "• " + p.name)
        .join("<br>");

    return `<b>Popular Tourist Places in Trichy:</b><br><br>${list}`;
}

// -------------------------------------
// INTENT DETECTION
// -------------------------------------
function detectIntent(msg) {

    msg = normalizeText(msg);

    if (msg.includes("1 day") || msg.includes("itinerary"))
        return "itinerary";

    if (msg.includes("near"))
        return "nearby";

    if (msg.includes("route") || msg.includes("how to go"))
        return "route";

    return "details";
}

// -------------------------------------
// MAIN BOT LOGIC
// -------------------------------------
function getBotReply(message) {

    const msg = normalizeText(message);

    if (detectGreeting(msg)) {

        return `
Hello 👋 Welcome to Trichy Tourism Assistant.

You can ask things like:
• popular places
• tell me about srirangam
• nearby places from rockfort
• 1 day plan from srirangam
`;
    }

    if (msg.includes("popular"))
        return getPopularPlaces();

    const intent = detectIntent(msg);
    const place = resolvePlace(msg);

    if (!place)
        return `
I couldn't find that place.

Try asking about:
• Srirangam Temple
• Rockfort
• Vayalur Temple
• Kallanai Dam
• Poondi Madha Basilica
`;

    if (intent === "details")
        return formatPlace(place);

    if (intent === "nearby") {

        const key = findDistanceKey(place.name);
        const list = getSortedNearby(key);

        return `<b>Nearby places from ${place.name}</b><br><br>${list.join("<br>")}`;
    }

    if (intent === "route") {

        const key = findDistanceKey(place.name);

        return generateRouteFrom(key);
    }

    if (intent === "itinerary")
        return buildOneDayItinerary(place);

    return "Sorry I couldn't understand that.";
}

// -------------------------------------
// UI FUNCTIONS
// -------------------------------------
function addMessageToUI(text, sender) {

    const box = document.getElementById("chatBox");

    const div = document.createElement("div");

    div.className = sender;

    if (sender === "bot") {

        div.innerHTML = "Typing...";
        box.appendChild(div);

        setTimeout(() => {
            div.innerHTML = text;
        }, 600);

    } else {

        div.innerHTML = text;
        box.appendChild(div);
    }

    box.scrollTop = box.scrollHeight;

    if (sender === "bot") {

        const speech = new SpeechSynthesisUtterance(
            text.replace(/<[^>]+>/g, "")
        );

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

// -------------------------------------
// QUICK BUTTONS
// -------------------------------------
function quickAsk(text) {

    document.getElementById("userInput").value = text;

    sendMessage();
}
