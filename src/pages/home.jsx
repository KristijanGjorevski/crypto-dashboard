import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortInput from '../components/SortInput';
import Spinner from '../components/Spinner';

export const HomePage = ({
    coins,
    filter,
    setFilter,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    loading,
    error
}) => {

    const filteredData = coins.filter((item) => {
        return (
            item.name.toLowerCase().includes(filter.toLowerCase()) ||
            item.symbol.toLowerCase().includes(filter.toLowerCase())
        )
    }).slice().sort((a, b) => {

        switch (sortBy) {
            case 'market_cap_desc':
                return b.market_cap - a.market_cap
            case 'market_cap_asc':
                return a.market_cap - b.market_cap
            case 'price_desc':
                return b.current_price - a.current_price
            case 'price_asc':
                return a.current_price - b.current_price
            case 'change_desc':
                return b.change_percentage_24h - a.change_percentage_24h
            case 'change_asc':
                return a.change_percentage_24h - b.change_percentage_24h
            default:
                return 0;
        }
    });

    return (
        <>
            <div>
                <h1>🚀 Crypto Dash &#128640;</h1>
            </div>
            {loading && <Spinner color='white' />}
            {error && <div className="error">{error}</div>}

            <div className="top-controls">
                <FilterInput filter={filter} setFilter={setFilter} />
                <LimitSelector limit={limit} onLimitChange={setLimit} />
                <SortInput sort={sortBy} onSort={setSortBy} />
            </div>

            {!loading && !error && (
                <main className="grid">
                    {filteredData.map((coin) => (
                        <CoinCard key={coin.id} coin={coin} />
                    ))}
                </main>
            )}
        </>
    )
}
