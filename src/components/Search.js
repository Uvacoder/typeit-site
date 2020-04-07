import React from 'react';

export default () => {
    const getSearchResults = (query) => {
        if (!query || !window.__LUNR__) return []
        const lunrIndex = window.__LUNR__['en'];
        const results = lunrIndex.index.search(query) // you can  customize your search , see https://lunrjs.com/guides/searching.html

        console.log(results);
        return results.map(({ ref }) => lunrIndex.store[ref])
    }

    return (
        <div>

            <button onClick={() => console.log(getSearchResults('squarespace'))}>
                get
            </button>
            
        </div>
    )
}
