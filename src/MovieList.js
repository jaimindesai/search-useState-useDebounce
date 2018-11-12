import React from "react";
import Movie from "./Movie";

const MovieList = props => {
  return props.data.map(r => (
    <div key={r.id}>
      <Movie title={r.title} />
    </div>
  ));
};

export default MovieList;
