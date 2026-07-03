const { useState, useMemo, useRef, useEffect } = React;

/* ============================================================
   Icon set — small inline SVGs, no external icon library needed
   ============================================================ */
const Icon = {
  Plane: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.8V22l3.5-1 3.5 1v-1.2L12 19v-5.5l9 2.5z"/></svg>
  ),
  Hotel: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 21V7a2 2 0 0 1 2-2h6v16"/><path d="M13 21V11a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10"/><path d="M3 21h18"/><path d="M7 9h.01M7 13h.01M7 17h.01"/></svg>
  ),
  Combo: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12h18"/><path d="M12 3v18"/><circle cx="12" cy="12" r="9"/></svg>
  ),
  Swap: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 16V4M7 4 3 8M17 8v12m0 0 4-4"/></svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Bell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.8L12 17.6 5.9 21.1l1.5-6.8-5.2-4.7 6.9-.7z"/></svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Heart: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 21s-7.5-4.9-10-9.3C.4 8.1 2 4.5 5.6 4a5 5 0 0 1 6.4 2.6A5 5 0 0 1 18.4 4c3.6.5 5.2 4.1 3.6 7.7C19.5 16.1 12 21 12 21z"/></svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5z"/></svg>
  ),
  Tag: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.6 12.9 12 21.5 2.5 12A2.4 2.4 0 0 1 2 10.4V4a2 2 0 0 1 2-2h6.4a2.4 2.4 0 0 1 1.7.7l8.5 8.5a2.4 2.4 0 0 1 0 3.4Z"/><path d="M8 8h.01"/></svg>
  ),
  Wallet: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 7H5a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2h12v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-8H5"/><path d="M18 15h.01"/></svg>
  ),
  Trend: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 17 9 11l4 4 8-8"/><path d="M15 7h6v6"/></svg>
  ),
};

/* Small helpers */
const inr = (n) => "₹" + n.toLocaleString("en-IN");
const dow = (d) => d.toLocaleDateString("en-US", { weekday: "short" });
const todayISO = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

/* ============================================================
   Logo
   ============================================================ */
function Logo({ dark }) {
  return (
    <a className="logo" href="#top" style={dark ? { color: "#fbfaf7" } : {}}>
      <span className="logo-mark"><Icon.Plane style={{ width: 16, height: 16 }} /></span>
      ixigo<span className="dot" />
    </a>
  );
}

/* ============================================================
   Header
   ============================================================ */
function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Logo />
        <nav className="header-nav">
          <a href="#flights">Flights</a>
          <a href="#hotels">Hotels</a>
          <a href="#trending">Trending</a>
          <a href="#offers">Offers</a>
          <button className="btn-signin">Sign in</button>
        </nav>
      </div>
    </header>
  );
}

/* ============================================================
   Hero with animated route line
   ============================================================ */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-route">
        <svg viewBox="0 0 1200 480" preserveAspectRatio="none">
          <path className="route-path" d="M -40 260 C 260 60, 620 420, 1260 120" />
          <g className="route-plane">
            <Icon.Plane style={{ width: 22, height: 22, color: "#F5A623", transform: "rotate(35deg)" }} />
          </g>
        </svg>
      </div>
      <div className="wrap hero-inner">
        <span className="hero-eyebrow">
          <Icon.Trend style={{ width: 13, height: 13 }} /> Smart fares, updated every minute
        </span>
        <h1>Fly, stay & save — <em>all in one ticket.</em></h1>
        <p className="sub">
          Compare 500+ airlines and 2 lakh+ hotels, unlock member-only fares,
          and bundle your trip for a bigger discount every time.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   Traveller picker popover
   ============================================================ */
function TravellersPicker({ value, onChange, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  const set = (key, delta) => {
    onChange({ ...value, [key]: Math.max(key === "adults" ? 1 : 0, Math.min(9, value[key] + delta)) });
  };

  return (
    <div className="travellers-pop" ref={ref} onClick={(e) => e.stopPropagation()}>
      {[
        ["adults", "Adults", "12+ years"],
        ["children", "Children", "2–11 years"],
        ["infants", "Infants", "Under 2 years"],
      ].map(([key, label, desc]) => (
        <div className="trav-row" key={key}>
          <div>
            <div className="label">{label}</div>
            <div className="desc">{desc}</div>
          </div>
          <div className="stepper">
            <button type="button" onClick={() => set(key, -1)} disabled={value[key] <= (key === "adults" ? 1 : 0)}>−</button>
            <span>{value[key]}</span>
            <button type="button" onClick={() => set(key, 1)}>+</button>
          </div>
        </div>
      ))}
      <div className="class-select">
        {["Economy", "Premium", "Business", "First"].map((c) => (
          <button
            type="button"
            key={c}
            className={"class-chip" + (value.cabin === c ? " active" : "")}
            onClick={() => onChange({ ...value, cabin: c })}
          >{c}</button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Search card (boarding-pass ticket)
   ============================================================ */
function SearchTicket({ tab, setTab, onSearch, loading }) {
  const [tripType, setTripType] = useState("round");
  const [from, setFrom] = useState("DEL");
  const [to, setTo] = useState("BOM");
  const [destination, setDestination] = useState("Goa");
  const [depart, setDepart] = useState(todayISO(3));
  const [ret, setRet] = useState(todayISO(7));
  const [checkin, setCheckin] = useState(todayISO(3));
  const [checkout, setCheckout] = useState(todayISO(6));
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, infants: 0, cabin: "Economy" });
  const [rooms, setRooms] = useState(1);
  const [showTrav, setShowTrav] = useState(false);
  const [flexDates, setFlexDates] = useState(true);
  const [directOnly, setDirectOnly] = useState(false);

  const swap = () => { setFrom(to); setTo(from); };
  const fromInfo = AIRPORTS.find((a) => a.code === from);
  const toInfo = AIRPORTS.find((a) => a.code === to);
  const travCount = travellers.adults + travellers.children + travellers.infants;

  const handleSearch = () => {
    onSearch({ tab, tripType, from, to, destination, depart, ret, checkin, checkout, travellers, rooms, directOnly });
  };

  return (
    <div className="ticket">
      <div className="ticket-tabs">
        <button className={"ticket-tab" + (tab === "flights" ? " active" : "")} onClick={() => setTab("flights")}>
          <Icon.Plane /> Flights
        </button>
        <button className={"ticket-tab" + (tab === "hotels" ? " active" : "")} onClick={() => setTab("hotels")}>
          <Icon.Hotel /> Hotels
        </button>
        <button className={"ticket-tab" + (tab === "combo" ? " active" : "")} onClick={() => setTab("combo")}>
          <Icon.Combo /> Flights + Hotels <span className="badge-save">SAVE 20%</span>
        </button>
      </div>

      <div className="ticket-body">
        <div className="trip-type-row">
          {tab !== "hotels" ? (
            <div className="pill-group">
              {[["oneway", "One way"], ["round", "Round trip"], ["multi", "Multi-city"]].map(([k, l]) => (
                <button key={k} className={"pill" + (tripType === k ? " active" : "")} onClick={() => setTripType(k)}>{l}</button>
              ))}
            </div>
          ) : (
            <div className="pill-group">
              <button className="pill active">Domestic & International</button>
            </div>
          )}
          <span className="trip-hint"><span className="live-dot" /> Fares refreshed 4 min ago</span>
        </div>

        <div className="perforation" />

        {tab === "flights" && (
          <div className="field-grid">
            <div className="field">
              <label>From</label>
              <div className="value-row"><span className="city-code">{from}</span></div>
              <div className="city-name">{fromInfo.city} · {fromInfo.name}</div>
              <select value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From city" style={{ position: "absolute", inset: 0, opacity: 0 }}>
                {AIRPORTS.map((a) => <option key={a.code} value={a.code}>{a.city}</option>)}
              </select>
            </div>
            <button className="swap-btn" onClick={swap} aria-label="Swap cities"><Icon.Swap /></button>
            <div className="field">
              <label>To</label>
              <div className="value-row"><span className="city-code">{to}</span></div>
              <div className="city-name">{toInfo.city} · {toInfo.name}</div>
              <select value={to} onChange={(e) => setTo(e.target.value)} aria-label="To city" style={{ position: "absolute", inset: 0, opacity: 0 }}>
                {AIRPORTS.map((a) => <option key={a.code} value={a.code}>{a.city}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Departure</label>
              <input type="date" value={depart} min={todayISO()} onChange={(e) => setDepart(e.target.value)} />
            </div>
            <div className="field">
              <label>Return</label>
              <input type="date" value={ret} min={depart} disabled={tripType !== "round"} onChange={(e) => setRet(e.target.value)}
                style={tripType !== "round" ? { opacity: 0.35 } : {}} />
            </div>
            <div className="field travellers" onClick={() => setShowTrav((s) => !s)}>
              <label>Travellers & class</label>
              <div className="value-row"><span className="city-code" style={{ fontSize: 18 }}>{travCount}</span></div>
              <div className="city-name">{travellers.cabin}</div>
              {showTrav && <TravellersPicker value={travellers} onChange={setTravellers} onClose={() => setShowTrav(false)} />}
            </div>
          </div>
        )}

        {tab === "hotels" && (
          <div className="field-grid hotels">
            <div className="field">
              <label>Destination</label>
              <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="City or hotel name" />
              <div className="sub-text">India & 90+ countries</div>
            </div>
            <div className="field">
              <label>Check-in</label>
              <input type="date" value={checkin} min={todayISO()} onChange={(e) => setCheckin(e.target.value)} />
            </div>
            <div className="field">
              <label>Check-out</label>
              <input type="date" value={checkout} min={checkin} onChange={(e) => setCheckout(e.target.value)} />
            </div>
            <div className="field travellers" onClick={() => setShowTrav((s) => !s)}>
              <label>Guests & rooms</label>
              <div className="value-row"><span className="city-code" style={{ fontSize: 18 }}>{travCount}</span></div>
              <div className="city-name">{rooms} room{rooms > 1 ? "s" : ""}</div>
              {showTrav && <TravellersPicker value={travellers} onChange={setTravellers} onClose={() => setShowTrav(false)} />}
            </div>
          </div>
        )}

        {tab === "combo" && (
          <div className="field-grid combo">
            <div className="field">
              <label>From</label>
              <div className="value-row"><span className="city-code">{from}</span></div>
              <div className="city-name">{fromInfo.city}</div>
              <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ position: "absolute", inset: 0, opacity: 0 }}>
                {AIRPORTS.map((a) => <option key={a.code} value={a.code}>{a.city}</option>)}
              </select>
            </div>
            <div className="field">
              <label>To (stay here)</label>
              <div className="value-row"><span className="city-code">{to}</span></div>
              <div className="city-name">{toInfo.city}</div>
              <select value={to} onChange={(e) => { setTo(e.target.value); setDestination(AIRPORTS.find(a=>a.code===e.target.value).city); }} style={{ position: "absolute", inset: 0, opacity: 0 }}>
                {AIRPORTS.map((a) => <option key={a.code} value={a.code}>{a.city}</option>)}
              </select>
            </div>
            <button className="swap-btn" onClick={swap} aria-label="Swap cities"><Icon.Swap /></button>
            <div className="field">
              <label>Depart</label>
              <input type="date" value={depart} min={todayISO()} onChange={(e) => setDepart(e.target.value)} />
            </div>
            <div className="field">
              <label>Return</label>
              <input type="date" value={ret} min={depart} onChange={(e) => setRet(e.target.value)} />
            </div>
            <div className="field travellers" onClick={() => setShowTrav((s) => !s)}>
              <label>Travellers</label>
              <div className="value-row"><span className="city-code" style={{ fontSize: 18 }}>{travCount}</span></div>
              <div className="city-name">{travellers.cabin}</div>
              {showTrav && <TravellersPicker value={travellers} onChange={setTravellers} onClose={() => setShowTrav(false)} />}
            </div>
          </div>
        )}

        <div className="search-cta-row">
          <div className="toggle-row">
            {tab === "flights" && (
              <label className="switch-field" onClick={() => setDirectOnly((v) => !v)}>
                <span className={"switch" + (directOnly ? " on" : "")} />
                Nonstop only
              </label>
            )}
            <label className="switch-field" onClick={() => setFlexDates((v) => !v)}>
              <span className={"switch" + (flexDates ? " on" : "")} />
              Flexible ± 3 days (best price)
            </label>
          </div>
          <button className={"btn-search" + (loading ? " loading" : "")} onClick={handleSearch}>
            {loading ? <span className="spinner" /> : <Icon.Search />}
            {loading ? "Searching…" : "Search"}
          </button>
        </div>

        <div className="quick-chips">
          <span className="chip-label">Popular:</span>
          {POPULAR_ROUTES.map((r, i) => (
            <button key={i} className="route-chip" onClick={() => { setFrom(r.from); setTo(r.to); }}>
              <b>{r.from}</b>→<b>{r.to}</b> from {inr(r.price)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Offers strip
   ============================================================ */
function OffersStrip() {
  return (
    <section className="section tight" id="offers">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow-label">Handpicked for you</span>
            <h2>Offers & coupons</h2>
          </div>
        </div>
        <div className="offers-strip">
          {OFFERS.map((o) => (
            <div className="offer-card" key={o.code}>
              <span className="tag">{o.tag}</span>
              <h4>{o.title}</h4>
              <p>{o.desc}</p>
              <span className="offer-code">{o.code}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Sparkline for price trend
   ============================================================ */
function Sparkline({ points }) {
  const max = Math.max(...points), min = Math.min(...points);
  const norm = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 84 + 3;
    const y = 26 - ((p - min) / (max - min || 1)) * 22 + 2;
    return `${x},${y}`;
  });
  return (
    <svg className="sparkline" viewBox="0 0 90 30">
      <polyline points={norm.join(" ")} fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============================================================
   Smart bar: trend + price alert
   ============================================================ */
function SmartBar({ basePrice, tabLabel }) {
  const [alertOn, setAlertOn] = useState(false);
  const trendPoints = useMemo(() => {
    const rnd = seedRandom(basePrice);
    return Array.from({ length: 8 }, () => basePrice * (0.85 + rnd() * 0.3));
  }, [basePrice]);
  return (
    <div className="smart-bar">
      <div className="trend">
        <Sparkline points={trendPoints} />
        <div className="trend-text">
          {tabLabel} prices are <b>12% lower</b> than usual for these dates. Historically, prices rise closer to departure.
        </div>
      </div>
      <button className={"alert-btn" + (alertOn ? " on" : "")} onClick={() => setAlertOn((v) => !v)}>
        <Icon.Bell /> {alertOn ? "Price alert on" : "Set price alert"}
      </button>
    </div>
  );
}

/* ============================================================
   Fare calendar (flights only)
   ============================================================ */
function FareCalendar({ basePrice, selected, onSelect }) {
  const days = useMemo(() => fareCalendar(basePrice), [basePrice]);
  const cheapestIdx = days.reduce((best, d, i) => (d.price < days[best].price ? i : best), 0);
  return (
    <div className="fare-calendar">
      {days.map((d, i) => (
        <div
          key={i}
          className={"fare-day" + (i === cheapestIdx ? " cheapest" : "") + (selected === i ? " " : "")}
          style={selected === i ? { outline: "2px solid #2F80ED" } : {}}
          onClick={() => onSelect(i)}
        >
          <div className="dow">{dow(d.date)}</div>
          <div className="dnum">{d.date.getDate()}</div>
          <div className="price">{inr(d.price)}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Filters
   ============================================================ */
function FiltersRow({ tab, active, onToggle, counts }) {
  const flightFilters = ["Nonstop", "Morning", "Evening", "Refundable", "AC Airlines"];
  const hotelFilters = ["Free cancellation", "Pay at hotel", "4★ & above", "Breakfast included", "Pool"];
  const list = tab === "hotels" ? hotelFilters : flightFilters;
  return (
    <div className="filters-row">
      {list.map((f) => (
        <button key={f} className={"filter-chip" + (active.includes(f) ? " active" : "")} onClick={() => onToggle(f)}>
          {f} {counts && counts[f] ? <span className="count">({counts[f]})</span> : null}
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   Flight result card
   ============================================================ */
function FlightCard({ f, onBook }) {
  return (
    <div className="flight-card">
      <div className="airline-tag">
        <div className="airline-dot" style={{ background: f.airline.tint }}>{f.airline.code}</div>
        <div className="flight-no">{f.flightNo}</div>
      </div>
      <div className="route-block" style={{ flex: 1 }}>
        <div className="time-block"><div className="t">{f.dep}</div><div className="c">Origin</div></div>
        <div className="route-mid">
          <div className="dur">{f.duration}</div>
          <div className="route-line"><Icon.Plane className="plane-mid" style={{ transform: "rotate(90deg)" }} /></div>
          <div className={"stops-tag" + (f.stops ? " has-stop" : "")}>{f.stops ? "1 stop" : "Nonstop"}</div>
        </div>
        <div className="time-block"><div className="t">{f.arr}</div><div className="c">Destination</div></div>
      </div>
      <div className="tags-block">
        {f.refundable && <span className="mini-tag refund">Refundable</span>}
        {!f.stops && <span className="mini-tag fast">Fastest</span>}
      </div>
      <div className="price-block">
        <div className="price">{inr(f.price)}</div>
        <div className="per">per adult</div>
        <button className="book-btn" onClick={() => onBook(f)}>Book now</button>
      </div>
    </div>
  );
}

/* ============================================================
   Hotel result card
   ============================================================ */
function HotelCard({ h, onBook }) {
  return (
    <div className="hotel-card">
      <div className="hotel-media" style={{ background: `linear-gradient(135deg, ${h.grad[0]}, ${h.grad[1]})` }}>
        <div className="rating-badge"><Icon.Star /> {h.rating}</div>
        <button className="fav-btn"><Icon.Heart /></button>
      </div>
      <div className="hotel-body">
        <h4>{h.name}</h4>
        <div className="reviews">{h.reviews.toLocaleString("en-IN")} reviews</div>
        <div className="amenity-row">
          {h.amenities.map((a) => <span className="amenity-pill" key={a}>{a}</span>)}
        </div>
        <div className="hotel-tags">
          {h.freeCancel && <span className="mini-tag refund">Free cancellation</span>}
          {h.payAtHotel && <span className="mini-tag fast">Pay at hotel</span>}
        </div>
        <div className="hotel-foot">
          <div>
            <span className="price">{inr(h.price)}</span>
            <span className="per">per night, taxes incl.</span>
          </div>
          <button className="book-btn" onClick={() => onBook(h)}>Book now</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Combo result card
   ============================================================ */
function ComboCard({ f, h, onBook }) {
  const total = f.price + h.price * 3;
  const original = Math.round(total * 1.2);
  return (
    <div className="combo-card">
      <div className="combo-half">
        <div className="combo-icon fl"><Icon.Plane style={{ width: 19, height: 19 }} /></div>
        <div>
          <div className="h-title">{f.airline.name} · {f.dep}–{f.arr}</div>
          <div className="h-sub">{f.flightNo} · {f.stops ? "1 stop" : "Nonstop"}</div>
        </div>
      </div>
      <div className="combo-divider" />
      <div className="combo-half">
        <div className="combo-icon ht"><Icon.Hotel style={{ width: 19, height: 19 }} /></div>
        <div>
          <div className="h-title">{h.name}</div>
          <div className="h-sub">★ {h.rating} · 3 nights</div>
        </div>
      </div>
      <div className="combo-price-block">
        <span className="save-tag">Bundle saves {inr(original - total)}</span>
        <div><span className="strike">{inr(original)}</span><span className="price">{inr(total)}</span></div>
        <button className="book-btn" onClick={() => onBook({ f, h, total })}>Book bundle</button>
      </div>
    </div>
  );
}

/* ============================================================
   Upsell banner (contextual, appears after a booking search)
   ============================================================ */
function Upsell({ kind, onAdd }) {
  const copy = {
    hotel: {
      icon: <Icon.Hotel />,
      title: "Add a hotel & save 20%",
      desc: <>You've picked your flight — bundle it with a stay in your destination city and unlock combo pricing. <span className="save-chip">Avg. saving ₹1,850</span></>,
      cta: "Add hotel to trip",
    },
    flight: {
      icon: <Icon.Plane />,
      title: "Add flights & save 20%",
      desc: <>Complete your trip — add a return flight to this hotel's city and get bundle-only fares. <span className="save-chip">Avg. saving ₹1,450</span></>,
      cta: "Add flights to trip",
    },
  }[kind];

  return (
    <div className="upsell">
      <div className="upsell-left">
        <div className="upsell-icon">{copy.icon}</div>
        <div>
          <h3>{copy.title}</h3>
          <p>{copy.desc}</p>
        </div>
      </div>
      <button className="upsell-btn" onClick={onAdd}>{copy.cta}</button>
    </div>
  );
}

/* ============================================================
   Trending destinations
   ============================================================ */
function TrendingDestinations({ onPick }) {
  return (
    <section className="section tight" id="trending">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow-label">Where next</span>
            <h2>Trending destinations</h2>
          </div>
        </div>
        <div className="dest-strip">
          {TRENDING_DESTINATIONS.map((d) => (
            <div className="dest-card" key={d.city} style={{ background: `linear-gradient(150deg, ${d.grad[0]}, ${d.grad[1]})` }} onClick={() => onPick(d.city)}>
              <div className="dtxt">
                <div className="city">{d.city}</div>
                <div className="note">{d.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Trust strip
   ============================================================ */
function TrustStrip() {
  const items = [
    [Icon.Shield, "Secure payments", "256-bit encryption on every transaction"],
    [Icon.Tag, "Lowest fare, guaranteed", "Found it cheaper? We'll match it"],
    [Icon.Wallet, "ixigo Money cashback", "Get instant wallet credit on every trip"],
    [Icon.Bell, "24×7 trip support", "Real humans, real help, any time"],
  ];
  return (
    <section className="wrap">
      <div className="trust-strip">
        {items.map(([Ic, t, d], i) => (
          <div className="trust-item" key={i}>
            <div className="ti-icon"><Ic /></div>
            <div><h5>{t}</h5><p>{d}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Results section — orchestrates flights / hotels / combo + upsell
   ============================================================ */
function ResultsSection({ tab, params, loading }) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [sort, setSort] = useState("cheapest");
  const [calIdx, setCalIdx] = useState(3);
  const [upsold, setUpsold] = useState(false);

  const flights = useMemo(() => generateFlights(params.from, params.to, 6), [params.from, params.to, params.depart]);
  const hotels = useMemo(() => generateHotels(params.destination || params.to, 6), [params.destination, params.to]);

  const toggleFilter = (f) => setActiveFilters((a) => a.includes(f) ? a.filter((x) => x !== f) : [...a, f]);

  if (loading) {
    return (
      <section className="section tight">
        <div className="wrap">
          {[1, 2, 3].map((i) => <div className="skeleton-row" key={i} />)}
        </div>
      </section>
    );
  }

  if (!params.searched) return null;

  if (tab === "flights") {
    const basePrice = flights[0]?.price || 4999;
    return (
      <section className="section tight" id="flights">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow-label">{params.from} → {params.to}</span>
              <h2>Best flights for your trip</h2>
            </div>
          </div>
          <SmartBar basePrice={basePrice} tabLabel="Flight" />
          <FareCalendar basePrice={basePrice} selected={calIdx} onSelect={setCalIdx} />
          <FiltersRow tab="flights" active={activeFilters} onToggle={toggleFilter} />
          <div className="results-meta">
            <span className="count"><b>{flights.length}</b> flights found · fares include all taxes</span>
            <div className="sort-row">
              {["cheapest", "fastest", "earliest"].map((s) => (
                <button key={s} className={"sort-chip" + (sort === s ? " active" : "")} onClick={() => setSort(s)}>
                  {s[0].toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="results-list">
            {flights.map((f) => <FlightCard key={f.id} f={f} onBook={() => setUpsold(true)} />)}
          </div>
          {upsold && <Upsell kind="hotel" onAdd={() => {}} />}
        </div>
      </section>
    );
  }

  if (tab === "hotels") {
    return (
      <section className="section tight" id="hotels">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow-label">{params.destination}</span>
              <h2>Handpicked stays in {params.destination}</h2>
            </div>
          </div>
          <SmartBar basePrice={hotels[0]?.price || 2999} tabLabel="Hotel" />
          <FiltersRow tab="hotels" active={activeFilters} onToggle={toggleFilter} />
          <div className="results-meta">
            <span className="count"><b>{hotels.length}</b> properties found</span>
            <div className="sort-row">
              {["cheapest", "top rated", "nearest"].map((s) => (
                <button key={s} className={"sort-chip" + (sort === s ? " active" : "")} onClick={() => setSort(s)}>
                  {s[0].toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="hotel-grid">
            {hotels.map((h) => <HotelCard key={h.id} h={h} onBook={() => setUpsold(true)} />)}
          </div>
          {upsold && <Upsell kind="flight" onAdd={() => {}} />}
        </div>
      </section>
    );
  }

  // combo tab
  const pairs = flights.slice(0, 4).map((f, i) => ({ f, h: hotels[i] }));
  return (
    <section className="section tight" id="combo">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow-label">{params.from} → {params.to} · bundle deal</span>
            <h2>Flight + hotel packages</h2>
          </div>
        </div>
        <SmartBar basePrice={(flights[0]?.price || 4999) + (hotels[0]?.price || 2999) * 2} tabLabel="Bundle" />
        <div className="results-meta">
          <span className="count"><b>{pairs.length}</b> packages · every bundle saves at least 15%</span>
        </div>
        <div className="results-list">
          {pairs.map((p, i) => <ComboCard key={i} f={p.f} h={p.h} onBook={() => {}} />)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <Logo dark />
        <small>© {new Date().getFullYear()} ixigo-style demo UI · Fares shown are illustrative</small>
      </div>
    </footer>
  );
}

/* ============================================================
   App
   ============================================================ */
function App() {
  const [tab, setTab] = useState("flights");
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({ searched: false, from: "DEL", to: "BOM", destination: "Goa" });

  const handleSearch = (p) => {
    setLoading(true);
    setTab(p.tab);
    setTimeout(() => {
      setParams({ ...p, searched: true });
      setLoading(false);
    }, 700);
  };

  const handlePickDestination = (city) => {
    setTab("hotels");
    setParams({ searched: true, from: "DEL", to: "GOI", destination: city });
  };

  return (
    <div className="app">
      <Header />
      <Hero />
      <div className="search-shell">
        <SearchTicket tab={tab} setTab={setTab} onSearch={handleSearch} loading={loading} />
      </div>

      <ResultsSection tab={tab} params={params} loading={loading} />

      <OffersStrip />
      <TrendingDestinations onPick={handlePickDestination} />
      <TrustStrip />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
