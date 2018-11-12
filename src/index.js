import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import useDebounce from "./use-debounce";
import searchMovie from "./fetch-movies";
import MovieList from "./MovieList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debounceSearchTerm) {
        setIsSearching(true);
        searchMovie(debounceSearchTerm).then(data => {
          setIsSearching(false);
          console.log(JSON.stringify(data.results));
          const filterResults = data.results.filter(r => r.vote_count > 10);
          setResults(filterResults);
        });
      } else {
        setResults([]);
      }
    },
    [debounceSearchTerm]
  );

  return (
    <div className="App">
      <input
        placeholder="Search Movie"
        onChange={e => setSearchTerm(e.target.value)}
      />

      {isSearching && <div>Searching Movies....</div>}

      <MovieList data={results} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
