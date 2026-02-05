import { useState, useEffect } from 'react'
import CoinCard from './components/CoinCard';
import LimitSelector from './components/LimitSelector';
import FilterInput from './components/FilterInput';
import SortInput from './components/SortInput';
const CeloURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
const API_URL = import.meta.env.VITE_API_COINGECKO;
const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5)
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_desc')

  useEffect(() => {

    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`);

        if (!res.ok) throw new Error('failed to fetch')

        const data = await res.json();
        // console.log('data ', data);

        const filteredData = data.filter((item) => {
          return item.name.toLowerCase().includes(filter.toLowerCase()) || item.symbol.toLowerCase().includes(filter.toLowerCase())
        });
        // console.log('FilteredData ', filteredData);

        setCoins(filter ? filteredData : data);

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()

  }, [limit, filter, sortBy])

  return (
    <>
      <div>
        <h1>🚀 Crypto Dash &#128640;</h1>
      </div>
      {loading && <p>Loading..</p>}
      {error && <div className="error">{error}</div>}

      <div className="top-controls">
        <FilterInput filter={filter} setFilter={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortInput sort={sortBy} onSort={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </main>
      )}
    </>
  )
}

export default App