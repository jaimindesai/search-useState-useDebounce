import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";

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

          const filterResults = data.results.filter(r => r.vote_count > 10);
          //data.results.map(r => r.title)
          console.log("data..", filterResults);
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
      {results.map(data => (
        <div key={data.id}>
          <h4>{data.title}</h4>
        </div>
      ))}
    </div>
  );
}

function searchMovie(search) {
  const apiKey = "fca5f943daa9668591efeb3151f1e923";
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=1&include_adult=false`,
    {
      method: "GET"
    }
  ).then(r => r.json());
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
