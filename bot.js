// =====================================
// TRICHY TOURISM – DASHBOARD LOGIC
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    renderGuide();
    renderUpcoming();
});

const junctionGroups = {
    "Chathiram & Srirangam Side": [
        "Srirangam Ranganathar Temple",
        "Thiruvanaikovil - Arulmigu Jambukeswarar Temple",
        "Mukkombu Dam (Upper Anaicut)",
        "Trichy Butterfly Park",
        "Trichy Birds Park",
        "Ucchi Pillayar Temple (Rockfort / Malaikottai)"
    ],
    "Trichy Junction Side": ["Vayalur Murugan Temple"],
    "Airport Side": ["Anna Planetarium"],
    "Highways (Kallanai Route)": ["Kallanai Dam (Grand Anicut)", "Poondi Madha Basilica"]
};

function renderGuide() {
    const container = document.getElementById("main-guide");
    let html = "";

    for (const [junction, places] of Object.entries(junctionGroups)) {
        html += `
        <div class="junction-section">
            <h2 class="junction-title">${junction}</h2>
            <div class="grid">
                ${places.map(pName => {
                    const place = trichyData.places.find(p => p.name === pName);
                    if(!place) return "";
                    return `
                    <div class="card">
                        <h3>${place.name}</h3>
                        <p>${place.about.substring(0, 150)}...</p>
                        <small><b>📍 Location:</b> ${place.location || 'Trichy'}</small><br>
                        <div class="distance-tag">🚗 ${place.travel ? place.travel.by_road : 'Check map for distance'}</div>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    }
    container.innerHTML = html;
}

function renderUpcoming() {
    const upcoming = [
        "Woraiyur Vekaliamman Temple",
        "Woraiyur Vishnu Temple",
        "Viralimalai Murugan Temple",
        "Iyyapan Temple (Near Lifestyle)",
        "Koviladi Vishnu Temple (Kallanai Route)",
        "Thiruvellarai Vishnu Temple (Thuraiyur Route)",
        "Thirupainjali Shivan Temple"
    ];
    
    const list = document.getElementById("upcoming-list");
    list.innerHTML = upcoming.map(item => `<li>${item}</li>`).join('');
}

function downloadPDF() {
    const element = document.getElementById('tour-content');
    const opt = {
        margin:       0.5,
        filename:     'Trichy_Tour_Plan.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}
