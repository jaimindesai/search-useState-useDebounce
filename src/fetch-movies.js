function searchMovie(search) {
  const apiKey = "fca5f943daa9668591efeb3151f1e923";
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=1&include_adult=false`,
    {
      method: "GET"
    }
  ).then(r => r.json());
}

export default searchMovie;
