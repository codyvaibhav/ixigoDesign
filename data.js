// ---------------------------------------------------------------------------
// Mock data layer. In a production build this would come from a booking API.
// ---------------------------------------------------------------------------

const AIRPORTS = [
  { code: "DEL", city: "Delhi", name: "Indira Gandhi Intl." },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Mah." },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda Intl." },
  { code: "GOI", city: "Goa", name: "Manohar Intl." },
  { code: "COK", city: "Kochi", name: "Cochin Intl." },
  { code: "JAI", city: "Jaipur", name: "Jaipur Intl." },
  { code: "DXB", city: "Dubai", name: "Dubai Intl." },
  { code: "SIN", city: "Singapore", name: "Changi" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi" },
  { code: "LON", city: "London", name: "Heathrow" },
];

const AIRLINES = [
  { code: "6E", name: "IndiGo", tint: "#0E7C7B" },
  { code: "AI", name: "Air India", tint: "#C1272D" },
  { code: "UK", name: "Vistara", tint: "#5A2D82" },
  { code: "SG", name: "SpiceJet", tint: "#FF6552" },
  { code: "QP", name: "Akasa Air", tint: "#2F80ED" },
];

const OFFERS = [
  {
    code: "IXI500",
    title: "Flat ₹500 off",
    desc: "On flight bookings above ₹4,500 with HDFC cards",
    tag: "Bank offer",
  },
  {
    code: "STAYMORE",
    title: "25% off hotels",
    desc: "Book 2+ nights, save instantly. No coupon needed",
    tag: "Hotel deal",
  },
  {
    code: "COMBO20",
    title: "Extra 20% off",
    desc: "When you bundle flights with a hotel stay",
    tag: "Bundle & save",
  },
  {
    code: "FIRSTTRIP",
    title: "₹250 cashback",
    desc: "New users get instant ixigo Money cashback",
    tag: "New user",
  },
];

const POPULAR_ROUTES = [
  { from: "DEL", to: "BOM", price: 3299 },
  { from: "BLR", to: "GOI", price: 2149 },
  { from: "DEL", to: "DXB", price: 14999 },
  { from: "BOM", to: "COK", price: 3899 },
  { from: "DEL", to: "SIN", price: 21999 },
];

const TRENDING_DESTINATIONS = [
  { city: "Goa", note: "Beaches & sunsets", grad: ["#FF6552", "#F5A623"] },
  { city: "Manali", note: "Snow-capped calm", grad: ["#2F80ED", "#0E7C7B"] },
  { city: "Jaipur", note: "Forts & bazaars", grad: ["#C1272D", "#F5A623"] },
  { city: "Dubai", note: "Skylines & souks", grad: ["#5A2D82", "#2F80ED"] },
  { city: "Kerala", note: "Backwater calm", grad: ["#0E7C7B", "#2F80ED"] },
];

const HOTEL_NAMES = [
  "The Ivy Residency", "Sunset Point Resort", "Palm Grove Suites",
  "Blue Harbour Hotel", "Heritage Haveli", "Cloud Nine Inn",
  "Marina Bay Stays", "Lotus Garden Hotel",
];

const AMENITIES = ["Free WiFi", "Pool", "Breakfast", "Parking", "AC", "Spa"];

function seedRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateFlights(from, to, count = 6) {
  const rnd = seedRandom((from || "A").charCodeAt(0) + (to || "B").charCodeAt(0) * 7 + count);
  const results = [];
  for (let i = 0; i < count; i++) {
    const airline = AIRLINES[Math.floor(rnd() * AIRLINES.length)];
    const depHour = 5 + Math.floor(rnd() * 17);
    const depMin = rnd() > 0.5 ? "00" : "30";
    const durationMin = 75 + Math.floor(rnd() * 180);
    const arrMinutesTotal = depHour * 60 + parseInt(depMin) + durationMin;
    const arrHour = Math.floor(arrMinutesTotal / 60) % 24;
    const arrMin = arrMinutesTotal % 60;
    const stops = rnd() > 0.72 ? 1 : 0;
    const price = 2799 + Math.floor(rnd() * 9000);
    results.push({
      id: `${from}-${to}-${i}`,
      airline,
      flightNo: `${airline.code} ${100 + Math.floor(rnd() * 800)}`,
      dep: `${String(depHour).padStart(2, "0")}:${depMin}`,
      arr: `${String(arrHour).padStart(2, "0")}:${String(arrMin).padStart(2, "0")}`,
      duration: `${Math.floor(durationMin / 60)}h ${durationMin % 60}m`,
      stops,
      price,
      refundable: rnd() > 0.5,
    });
  }
  return results.sort((a, b) => a.price - b.price);
}

function generateHotels(destination, count = 6) {
  const rnd = seedRandom((destination || "X").charCodeAt(0) + count * 13);
  const results = [];
  for (let i = 0; i < count; i++) {
    const rating = (3 + rnd() * 2).toFixed(1);
    const price = 1799 + Math.floor(rnd() * 9000);
    const amenityCount = 3 + Math.floor(rnd() * 3);
    const shuffled = [...AMENITIES].sort(() => rnd() - 0.5).slice(0, amenityCount);
    results.push({
      id: `${destination}-hotel-${i}`,
      name: HOTEL_NAMES[Math.floor(rnd() * HOTEL_NAMES.length)],
      rating,
      reviews: 120 + Math.floor(rnd() * 2200),
      price,
      amenities: shuffled,
      freeCancel: rnd() > 0.4,
      payAtHotel: rnd() > 0.5,
      grad: TRENDING_DESTINATIONS[Math.floor(rnd() * TRENDING_DESTINATIONS.length)].grad,
    });
  }
  return results.sort((a, b) => a.price - b.price);
}

function fareCalendar(basePrice) {
  const days = [];
  const today = new Date();
  const rnd = seedRandom(basePrice);
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const delta = Math.floor((rnd() - 0.5) * 2400);
    days.push({
      date: d,
      price: Math.max(1999, basePrice + delta),
    });
  }
  return days;
}
