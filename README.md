# Crypto Dash

A small crypto dashboard I built while learning React. It pulls live market data from the public CoinGecko API and shows it as a grid of coin cards, with a details page and a 7-day price chart for each coin.

Live demo: https://crypto-dashboard-dusky-six.vercel.app

This is a learning project that I'm showing here, not something I'm maintaining for others. I'm not taking contributions or issues.

## What it does

- Lists the top coins by market cap (5, 10, 15, 20, 50 or 100 at a time)
- Search by name or symbol
- Sort by market cap, price, or 24h change
- Click a coin to see its details and a 7-day price chart
- Simple About page and a 404 page, all with client-side routing

## Built with

- React 19 and Vite
- React Router 7
- Tailwind CSS 4
- Chart.js with react-chartjs-2 and date-fns for the chart
- CoinGecko public API (no API key needed)

## Running it locally

You need Node.js 20.19 or newer (Vite 7 requires it).

```bash
git clone https://github.com/KristijanGjorevski/crypto-dashboard.git
cd crypto-dashboard
npm install
```

Create a `.env` file in the project root with the two API URLs:

```
VITE_API_COINGECKO=https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
VITE_API_ONECOIN=https://api.coingecko.com/api/v3/coins
```

These are public endpoints with no key in them. They're kept in `.env` so the URLs are easy to change in one place.

Then start the dev server:

```bash
npm run dev
```

and open the address Vite prints (usually http://localhost:5173).

Other scripts:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Two versions of the app

There are two top-level components on purpose, because I wanted to try two different ways of building the same thing:

- `src/App.jsx` is the first version. It's a single component with everything in one place: the fetching, the filtering and the layout all live in it, and it re-fetches whenever the sort, limit or filter changes.
- `src/App_v2.jsx` is the second version. It adds routing (home, about, coin details, 404) and moves the list UI into a separate `HomePage` component. Filtering and sorting happen on the client, so only the limit triggers a new request.

`src/main.jsx` decides which one is used. It currently renders `App_v2.jsx`. To try the first version, change the import there to `./App.jsx`.

## Notes

- CoinGecko's free API has rate limits, so if you click around quickly you might see a "failed to fetch" error. Wait a minute and try again.
- Since this runs entirely in the browser, anything in a `VITE_` variable ends up in the built JavaScript. That's fine for public URLs, but a private API key would need a small backend instead.
