"use client";
import {useState} from 'react';
import {useSearchParams} from "next/navigation";
// import natural from "natural";

export default function FactCheckPage() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search')
    const [query, setQuery] = useState(search ? search : '');
    const [factChecks, setFactChecks] = useState([]);

    // const natural = require('natural');
    // const tokenizer = new natural.WordTokenizer();
    //
    // let words = tokenizer.tokenize(query);
    //
    // console.log(words);

    // let stemmed_words= words.map(word => natural.PorterStemmer.stem(word));

    // let filtered_words = words.filter(word => !natural.stopwords.includes(word));

    // console.log(filtered_words.join(" "));
    async function handleSearch() {
        const response = await fetch(`/api/factcheck?query=${encodeURIComponent(query)}&languageCode=en`);
        const results = await response.json();
        setFactChecks(results);
    }

    if (query) {
        handleSearch()
    }

    // async function searchFactCheck() {
    //     const response = await fetch(`/api/factcheck?search=${encodeURIComponent(search)}&languageCode=en`);
    //     const results = await response.json();
    //     setFactChecks(results);
    // }


    return (
        <div>

            <h1 className={"text-5xl"}>Fact Check</h1>

            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <h1>Fact Checks</h1>
            <p>Query: {query}</p>
            <p>Results: {factChecks.length}</p>

            <ul>
                {factChecks.length === 0 && <li>No results</li>}
                {factChecks.map((factCheck) => (
                    <li key={factCheck.claimReview[0].url}>
                        <a href={factCheck.claimReview[0].url}>{factCheck.claimReview[0].title}</a>
                        <p>{factCheck.claimReview[0].textualRating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}