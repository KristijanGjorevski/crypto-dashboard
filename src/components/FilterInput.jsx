
const FilterInput = ({ setFilter, filter }) => {
    const clearBtn = (e) => {
        e.preventDefault();

        setFilter('');
    }

    return (
        <div className="filter">
            <input
                name="filter"
                id="filter"
                type="text"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                placeholder="Search coins..."
            />
            {filter && (
                <button className="clear-btn" onClick={clearBtn} aria-label="Clear filter">
                    &times;
                </button>
            )}
        </div>
    )
}

export default FilterInput