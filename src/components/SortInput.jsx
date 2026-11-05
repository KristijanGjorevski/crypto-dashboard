import React from 'react'

const SortInput = ({ onSort, sort }) => {
    return (
        <div className='controls'>
            <label htmlFor="sort">Sort By:</label>
            <select onChange={(e) => onSort(e.target.value)} value={sort} name="sort" id="sort">
                <option value="market_cap_desc">Cap descending</option>
                <option value="market_cap_asc">Cap asscending</option>
                <option value="price_desc">Price descending</option>
                <option value="price_asc">Price ascending</option>
                <option value="change_desc">24h descending</option>
                <option value="change_asc">24h ascending</option>
            </select>
        </div>
    )
}

export default SortInput