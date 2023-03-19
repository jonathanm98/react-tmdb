import axios from "axios";
import React, { useEffect, useState } from "react";
import ActiveMovieCard from "../components/ActiveMovieCard";
import Header from "../components/Header";
import Movie from "../components/Movie";
import getGenresIds from "../utils/getGenresIds";

const Favorites = () => {
  const [favMovies, setFavMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [dataRefresh, setDataRefresh] = useState(false);

  useEffect(() => {
    async function getFavMovies() {
      const likedMoviesFromLocalStorage =
        JSON.parse(localStorage.getItem("likedMovies")) || [];
      const movies = [];
      likedMoviesFromLocalStorage.forEach((id) => {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
          )
          .then((response) => {
            movies.push(response.data);
          });
      });
      setFavMovies(movies);
      setLikedMovies(likedMoviesFromLocalStorage);
      setMoviesGenres(await getGenresIds());
    }
    getFavMovies();
    setDataRefresh(false);
    //eslint-disable-next-line
  }, [dataRefresh]);

  const activeMovie =
    selectedId && favMovies.find((movie) => movie.id === selectedId);

  return (
    <>
      {selectedId && (
        <ActiveMovieCard
          activeMovie={activeMovie}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          likedMovies={likedMovies}
          setLikedMovies={setLikedMovies}
        />
      )}
      <Header />
      <main>
        <h2>Vos films favoris : </h2>
        <div className="favorites-container">
          {favMovies[0] ? (
            favMovies.map((movie, index) => (
              <Movie
                key={movie.id + Math.floor(Math.random())}
                movie={movie}
                index={index}
                moviesGenres={moviesGenres}
                setSelectedId={setSelectedId}
                likedMovies={likedMovies}
                setLikedMovies={setLikedMovies}
                setDataRefresh={setDataRefresh}
              />
            ))
          ) : (
            <h2>Vous n'avez pas encore de favoris...</h2>
          )}
        </div>
      </main>
    </>
  );
};

export default Favorites;
