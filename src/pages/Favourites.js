import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Movie from "../components/Movie";

const Favourites = () => {
  const favourites = JSON.parse(localStorage.getItem("likedMovies")) || [];
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    favourites.forEach((id) => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
        )
        .then((response) => {
          setFavMovies([...favMovies, response.data]);
        });
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        <h2>Favoris</h2>
        <div className="favourites-container">
          {favMovies.map((movie) => (
            <Movie />
          ))}
        </div>
      </main>
    </>
  );
};

export default Favourites;
