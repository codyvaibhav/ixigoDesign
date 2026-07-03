# ixigoDesign

# ixigo-style Travel Booking UI

A single-page flight / hotel / flight+hotel booking interface built with React
(via CDN, no build step), plain CSS, and a small mock data layer.

## Files

- `index.html` — page shell, loads fonts + React/Babel from CDN
- `style.css` — full design system (the "boarding pass" search card, cards, results, upsell banners)
- `data.js` — mock airports, airlines, offers, hotels, and fare/price generators
- `app.jsx` — all React components (header, hero, search ticket, results, upsell)

## Running it

Because `app.jsx` is transformed in the browser by Babel, it needs to be
**fetched over HTTP**, not opened as a bare `file://` path (browsers block
that fetch for security reasons). Serve the folder locally, e.g.:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000` in your browser.

## What's inside

- **3 tabs**: Flights (default) · Hotels · Flights + Hotels, styled as a
  boarding-pass ticket with a perforated divider and swap button.
- **Smart features**: live price-trend sparkline, price alerts, a 7-day fare
  calendar with the cheapest day highlighted, flexible-date and nonstop
  toggles, filter chips, and sort controls.
- **Offers strip**: bank offers, hotel deals, bundle discounts, cashback.
- **Contextual upsell**: after searching flights, a "add a hotel & save 20%"
  banner appears below results (and vice-versa for hotels) — same pattern
  used in the dedicated Flights + Hotels tab, which shows bundled pricing
  directly.
- Fully responsive down to mobile, with reduced-motion support.

This is a front-end demo with generated mock data — there's no backend or
real payment flow wired up.
