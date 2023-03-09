import React from "react";

const Movie = ({ movie }) => {
  return (
    <div id={movie.id} className="home-card">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt=""
      />
      <h3>{movie.title}</h3>
    </div>
  );
};

export default Movie;
