"use client";
import {useEffect, useState} from 'react';
import {useSearchParams} from "next/navigation";
import { Kanit } from "next/font/google";
import Image from "next/image";
import logo from "public/logo.jpg";
import Link from "next/link";


const kanit = Kanit({
    subsets: ["latin"],
    weight: ["400", "700", "800"]
});

export default function FactCheckPage() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search')
    const [query, setQuery] = useState(search ? search : '');
    const [factChecks, setFactChecks] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    async function handleSearch() {
        setIsSearched(true)
        const response = await fetch(`/api/factcheck?query=${encodeURIComponent(query)}`);
        const results = await response.json();
        setFactChecks(results);
    }

    function clearButton() {
        setFactChecks([])
        setIsSearched(false)
        setQuery('')
    }

    useEffect(()=> {
        if (query) {
            handleSearch()
        } else {
            setFactChecks([])
        }
    }, [])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    // if (query) {
    //     handleSearch();
    // }

    return (
        <main className={`${kanit.className} relative w-full min-h-[100svh] flex flex-col justify-center items-center gap-10 py-16 px-10`}>

            <nav className={"bg-[#f1f1f1] w-full shadow-md fixed top-0 py-2 px-4 flex flex-row justify-between items-center z-10"}>
                <Link href={"/"}><Image className={"rounded-full w-auto"} width={30} height={30} src={logo} alt={"Fake Or Not Logo"} /></Link>
                <div className={"flex flex-row gap-4"}>
                    <Link href={"/motive"}>Motive</Link>
                    <Link href={"/usage"}>How to use?</Link>
                </div>
            </nav>

            <div className={""}>
                <h1 className={"text-9xl text-[#121212]"}>Fake Or Not</h1>
            </div>

            <div className={"flex flex-row relative"}>
                <input required onKeyPress={handleKeyPress} autoFocus={true} placeholder={"Write Your Query Here..."} className={"pl-5 pr-28 border border-black rounded-lg min-w-[40vw] h-[5vh]"} type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className={"absolute hover:bg-[#62C370] h-full px-5 right-0 border border-black rounded-lg"} onClick={handleSearch}>Search</button>
            </div>

            {isSearched &&
                <div className={"flex flex-row min-w-[40vw] justify-between gap-10"}>
                    <p>Related News: {factChecks.length}</p>
                    <button onClick={clearButton}>Clear</button>
                </div>
            }

            <ul className={"flex flex-col gap-6"}>
                {/*{factChecks.length === 0 && <li>No results</li>}*/}
                {factChecks.map((factCheck) => (
                    <li className={"border border-black rounded-lg py-4 px-6 h-max flex flex-row justify-between"} key={factCheck.claimReview[0].url}>
                        <a target={"_blank"} className={"line-clamp-1"} href={factCheck.claimReview[0].url}>{factCheck.claimReview[0].title}</a>
                        {factCheck.claimReview[0].textualRating === "True" ? <p className={"ml-10 text-green-500"}>{factCheck.claimReview[0].textualRating}</p> : <p className={"ml-10 text-red-500"}>{factCheck.claimReview[0].textualRating}</p>}
                        {/*<p className={"ml-10"}>{factCheck.claimReview[0].textualRating}</p>*/}
                    </li>
                ))}
            </ul>

            {/*<div className={"absolute bottom-0 h-[20vh] w-full border-t border-gray-400"}>*/}

            {/*</div>*/}
        </main>
    );
}