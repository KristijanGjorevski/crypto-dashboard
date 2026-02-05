import { Link, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import CoinChart from '../components/CoinChart';

const API_URL = import.meta.env.VITE_API_ONECOIN;

const CoinDetailsPage = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [coin, setCoin] = useState(null)
    const [errori, setError] = useState('')

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`)

                if (!res.ok) throw new Error('failed to fetch')

                const data = await res.json();
                setCoin(data)

            } catch (err) {
                // Determine the error message safely
                setError(err.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        fetchApi()
    }, [id])

    // if (loading) return <div className="text-center mt-10">Loading...</div>
    // if (errori) return <div className="text-center mt-10 text-red-500">Error: {errori}</div>
    // if (!coin) return null;

    // const {
    //     name,
    //     symbol,
    //     description,
    //     image,
    //     market_data,
    //     categories
    // } = coin;

    // return (
    //     <div className="coin-details-container p-6 bg-slate-800 text-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
    //         <div className="flex items-center gap-4 mb-6">
    //             {/* Optional chaining ?. just in case image is missing */}
    //             <img src={image?.large} alt={name} className="w-20 h-20" />
    //             <div>
    //                 <h1 className="text-4xl font-bold">{name} ({symbol?.toUpperCase()})</h1>
    //                 <p className="text-slate-400 mt-1">
    //                     Current Price: ${market_data?.current_price?.usd?.toLocaleString()}
    //                 </p>
    //             </div>
    //         </div>

    //         <div className="mb-8">
    //             <h3 className="text-2xl font-bold mb-3">Description</h3>
    //             {/* Description can be HTML, or just text. En checks existence. */}
    //             <p className="text-slate-300 leading-relaxed"
    //                 dangerouslySetInnerHTML={{ __html: description?.en || 'No description available.' }}>
    //             </p>
    //         </div>

    //         <div>
    //             <h3 className="text-xl font-bold mb-3">Categories</h3>
    //             <ul className="flex flex-wrap gap-2">
    //                 {categories?.map((type) => (
    //                     // Using parenthesis () for implicit return
    //                     <li key={type} className="bg-slate-700 px-3 py-1 rounded-full text-sm">
    //                         {type}
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     </div>
    // )

    return (
        <div className='coin-details-container' >
            <Link to='/'>Back to Home</Link>

            <h1 className="coin-details-title">
                {coin ? `${coin.name} ${coin.symbol}` : 'Coin Details'}
            </h1>

            {loading && <Spinner />}
            {errori && <div className='error'>{errori}</div>}

            {!loading && !errori && (
                <>
                    <img src={coin.image.large} alt={coin.name} className='coin-details-image' />
                    <p>{coin.description.en.split('. ')[0] + '.'}</p>

                    <div className="coin-details-info">
                        <h3>Rank: {coin.market_cap_rank}</h3>
                        <h3>Curr Price: ${coin.market_data.current_price.usd.toLocaleString()}</h3>
                        <h4>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                        <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
                        <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
                        <h4>Price Change: ${coin.market_data.price_change_24h.toFixed(2)}%</h4>
                        <h4>Circulating Supply: {coin.market_data.circulating_supply.toLocaleString()}</h4>
                        <h4>Total Supply: {coin.market_data.total_supply?.toLocaleString() || 'N/A'}</h4>
                        <h4>All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{': ' + new Date(coin.market_data.ath_date.usd).toLocaleDateString()}</h4>
                        <h4>All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{': ' + new Date(coin.market_data.atl_date.usd).toLocaleDateString()}</h4>
                        <h4>Last Updated: {new Date(coin.last_updated).toLocaleString()}</h4>
                    </div>

                    <CoinChart coinId={coin.id} />

                    <div className="coin-details-links">
                        {coin.links.homepage[0] && (
                            <p><a href={coin.links.homepage[0]} target='_blank' rel="noopener noreferrer">Website</a></p>
                        )}
                        {coin.links.blockchain_site[0] && (
                            <p><a href={coin.links.blockchain_site[0]} target="_blank" rel='noopener noreferrer'>Blockchain Explorer</a></p>
                        )}
                        {coin.categories.length > 0 && (
                            <p>Categories: {coin.categories.join(', ')}</p>
                        )}

                        {!loading && !errori && !coin && <p>No Data found..</p>}
                    </div>
                </>
            )}
        </div>
    )
}

export default CoinDetailsPage