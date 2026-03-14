// ===============================
//   TRICHY TOURISM DATA MODEL
// ===============================

const trichyData = {

    // =====================
    // 1. TOURIST PLACES
    // =====================
    places: [
        {
            keywords: ["srirangam", "ranganathar", "ranganathaswamy", "srirangam temple"],
            name: "Srirangam Ranganathar Temple",
            also_known_as: ["Ranganathaswamy Temple", "Srirangam Temple"],
            location: "Srirangam, Tiruchirappalli",
            side: "Chathiram Bus Stand / Srirangam Junction Side",
            about: "One of India's most revered temples, dedicated to Lord Ranganatha (Vishnu) and Ranganayaki (Lakshmi). Built in traditional Tamil architectural style, honored in the Alvars' hymns, and is the foremost of Vishnu's 108 Divya Desams. It is the largest operational temple complex in the world. Expanded over centuries, includes a 73-meter gopuram (completed in 1987). Hosts a 21-day Margazhi festival. Received UNESCO Asia-Pacific Award of Merit in 2017 and is on UNESCO's tentative list.",
            travel: {
                by_road: "Around 15 km from Old Central Bus Stand, 19 km from Panjappur New Bus Terminal, 4.5 km from Chathiram Bus Stand.",
                by_air: "Tiruchirappalli International Airport, ~17 km away.",
                by_rail: "Srirangam Railway Station, 1–1.5 km away."
            }
        },

        {
            keywords: ["thiruvanaikovil", "jambukeswarar", "akilandeswari", "water temple"],
            name: "Thiruvanaikovil - Arulmigu Jambukeswarar Temple",
            location: "Thiruvanaikovil, Tiruchirappalli",
            side: "Chathiram Bus Stand / Srirangam Junction Side",
            about: "A major Shiva temple and one of the Pancha Bhoota Sthalams representing water (Neer). The sanctum contains a natural underground water spring symbolizing this element. One of the 275 Paadal Petra Sthalams. Contains many Chola-era inscriptions. Lord Shiva is worshipped as Jambukeswarar and Goddess Akilandeswari.",
            travel: {
                by_road: "~13 km from Old Central Bus Stand, ~18 km from Panjappur, ~4 km from Chathiram Bus Stand.",
                by_air: "Tiruchirappalli Airport (~15 km).",
                by_rail: "Srirangam Railway Station (~3 km)."
            }
        },

        {
            keywords: ["rockfort", "malaikottai", "ucchi pillayar", "ganesha temple"],
            name: "Ucchi Pillayar Temple (Rockfort / Malaikottai)",
            location: "Tiruchirappalli, Tamil Nadu",
            side: "Chathiram Bus Stand / Srirangam Junction Side",
            about: "A 7th-century temple dedicated to Lord Ganesha located atop the Rock Fort Hill. Historically significant with breathtaking city views. Associated with the legend of Vibhishana chasing Lord Vinayaka after he placed the Ranganatha idol at Srirangam, leaving a scar on Ganesha’s forehead.",
            travel: {
                by_road: "~6 km from Old Central Bus Stand, ~15 km from Panjappur, ~2 km from Chathiram Bus Stand.",
                by_air: "Airport ~10 km.",
                by_rail: "Nearest: Trichy Junction & Srirangam (~5 km)."
            }
        },

        {
            keywords: ["vayalur", "murugan temple", "kumaravayalur"],
            name: "Vayalur Murugan Temple",
            location: "Kumaravayalur, Tiruchirappalli",
            side: "Trichy Junction Side",
            about: "An important Murugan temple established in the 9th century by the Medieval Cholas. Maintained by HR&CE. Although Shiva (Adinathar) is the presiding deity, Murugan is the highlight. Linked with Saint Kirupanandha Variyar. Surrounded by scenic greenery near the Uyyakondan River. Associated with Arunagirinathar who composed Thirupugazh here.",
            travel: {
                by_road: "~10 km from Old Central Bus Stand, ~19 km from Panjappur, ~13 km from Chathiram Bus Stand.",
                by_air: "Tiruchirappalli Airport (~16 km).",
                by_rail: "Tiruchirappalli Junction (~11 km)."
            }
        },

        {
            keywords: ["poondi", "poondi madha", "basilica", "our lady church"],
            name: "Poondi Madha Basilica",
            location: "Alamelupuram-Poondi, near Thirukattupalli",
            side: "Others (Kallanai Route)",
            about: "A major Catholic pilgrimage site dedicated to Our Lady of the Immaculate Conception. Elevated to Minor Basilica on August 3, 1999 by Pope John Paul II. Architecture blends French and Gothic styles. Contains a relic of the True Cross and statues of the Apostles, St. Francis Xavier, and Fr. Beschi."
        },

        {
            keywords: ["birds park", "trichy birds", "bird park"],
            name: "Trichy Birds Park",
            side: "Chathiram Bus Stand / Srirangam Junction Side",
            about: "A popular 4.02-acre attraction with 40+ exotic bird species. Visitors can observe and feed birds safely. Also houses 40 species of freshwater & marine fish. Themed into the five ancient Tamil landscapes: Kurinji, Mullai, Marutham, Neithal, and Palai."
        },

        {
            keywords: ["butterfly park", "butterfly conservatory", "srirangam butterfly"],
            name: "Trichy Butterfly Park",
            side: "Chathiram Bus Stand / Srirangam Junction Side",
            location: "Srirangam - Upper Anaicut Reserve Forest",
            about: "Asia’s largest butterfly park (25 acres). Features glasshouse, fountains, boating, sculptures, nectar plants, and a 1.2 km walkway. Includes Nakshatravanam with 27 star-trees and 12 zodiac trees. Inaugurated in 2015."
        },

        {
            keywords: ["kallanai", "grand anicut", "karikalan dam"],
            name: "Kallanai Dam (Grand Anicut)",
            side: "Others (Kallanai Route)",
            about: "One of the oldest functioning water-regulator structures in the world. Built by Chola king Karikalan between 100–150 CE across River Kaveri. 329m long, 20m wide, 5.4m high. Irrigated 69,000 acres in ancient times. Renovated by the British; inspired Sir Arthur Cotton’s works.",
            location: "About 15 km from Tiruchirappalli"
        },

        {
            keywords: ["mukkombu", "upper anaicut", "picnic dam"],
            name: "Mukkombu Dam (Upper Anaicut)",
            side: "Chathiram Bus Stand / Srirangam Junction Side",
            about: "Regulator dam built by Sir Arthur Cotton between 1836–1838. Located where Kollidam diverges from Cauvery. 685m long. Popular picnic spot with gardens and river views.",
            location: "18 km west of Tiruchirappalli"
        },

        {
            keywords: ["anna planetarium", "planetarium", "science center"],
            name: "Anna Planetarium",
            side: "Trichy Airport Side",
            location: "Pudukkottai Main Road, Trichy",
            about: "A planetarium located near the airport area, offering shows about the universe and space. It is a significant educational landmark for students and tourists visiting the city."
        }
    ],

    // =====================
    // 2. DISTANCES (UNTOUCHED)
    // =====================
    distances: {
        from_srirangam_temple: {
            thiruvanaikovil: 3,
            vayalur: 24,
            uchi_pillaiyar: 7.3,
            anna_planetarium: 15,
            kallanai: 17,
            mukkombu: 19,
            poondi_matha: 32,
            birds_park: 7.2,
            butterfly_park: 6.8
        },

        from_thiruvanaikovil: {
            srirangam: 3,
            vayalur: 16,
            uchi_pillaiyar: 5.2,
            anna_planetarium: 13,
            kallanai: 15,
            mukkombu: 18,
            poondi_matha: 31,
            birds_park: 5.7,
            butterfly_park: 9.8
        },

        from_vayalur: {
            srirangam: 24,
            thiruvanaikovil: 16,
            uchi_pillaiyar: 12,
            anna_planetarium: 15,
            kallanai: 27,
            mukkombu: 15,
            poondi_matha: 43,
            birds_park: 11,
            butterfly_park: 21
        },

        from_uchi_pillaiyar: {
            srirangam: 7.3,
            thiruvanaikovil: 5.2,
            vayalur: 12,
            kallanai: 17,
            mukkombu: 17,
            poondi_matha: 35,
            birds_park: 3.6,
            butterfly_park: 13
        },

        from_kallanai: {
            anna_planetarium: 20,
            poondi_matha: 16,
            birds_park: 16,
            butterfly_park: 23,
            mukkombu: 30,
            srirangam: 18,
            thiruvanaikovil: 16,
            vayalur: 29,
            uchi_pillaiyar: 17
        },

        from_mukkombu: {
            birds_park: 14,
            butterfly_park: 25,
            anna_planetarium: 24,
            poondi_matha: 47
        },

        from_birds_park: {
            butterfly_park: 12,
            anna_planetarium: 10,
            poondi_matha: 33
        },

        from_butterfly_park: {
            anna_planetarium: 20,
            poondi_matha: 38
        },

        from_anna_planetarium: {
            poondi_matha: 37
        }
    },

    // =====================
    // 3. UPCOMING UPDATES
    // =====================
    upcoming: [
        { name: "Woraiyur Vekaliamman Temple", note: "Pass nearby while in Trichy City" },
        { name: "Woraiyur Vishnu Temple", note: "Pass nearby while in Trichy City" },
        { name: "Viralimalai Murugan Temple", note: "On the way to Madurai/Pudukkottai" },
        { name: "Iyyapan Temple at Trichy City", note: "Near Lifestyle" },
        { name: "Koviladi Vishnu Temple", note: "On the way from Kallanai to Thiruvaiyaru route" },
        { name: "Thiruvellarai Vishnu Temple", note: "Present at Trichy to Thuraiyur Route" },
        { name: "Thirupainjali Shivan Temple", note: "Near Thiruvellarai" }
    ],

    // =====================
    // 4. ROUTE GROUPS & RULES
    // =====================
    same_route: [
        ["Kallanai Dam", "Poondi Madha Basilica"],
        ["Srirangam Temple", "Thiruvanaikovil", "Kallanai Dam", "Poondi Madha Basilica"],
        ["Ucchi Pillaiyar Temple", "Trichy Birds Park"],
        ["Trichy Butterfly Park", "Srirangam Temple", "Thiruvanaikovil Temple"],
        ["Ucchi Pillaiyar Temple", "Srirangam Temple", "Thiruvanaikovil Temple"]
    ],

    starting_points: {
        panjapur_terminal: { start_with: "Anna Planetarium", next_steps: "Proceed to Vayalur, then follow distances." },
        trichy_junction: { start_with: "Vayalur Temple", next_steps: "Visit nearby places." },
        chathiram_bus_stand: { start_with: "Ucchi Pillaiyar Temple", next_steps: "Recommend nearby/same-route places." },
        airport: { start_with: "Anna Planetarium", next_steps: "Follow distance + same-route logic." }
    }
};
