import axios from "axios";
import React, { useState, useEffect } from "react";
import ActiveMovieCard from "../components/ActiveMovieCard";
import Header from "../components/Header";
import Movie from "../components/Movie";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function getPopularMovies() {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
        )
        .then((response) => {
          setMoviesGenres(response.data.genres);
        });
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&page=1`
        )
        .then((response) => {
          const data = response.data.results;
          if (data.length > 0) setMovies((movies) => [...movies, ...data]);
        });
      getAllGenresById();
    }

    function getAllGenresById() {
      const genreIds = [];

      movies.forEach((movie) => {
        console.log(movie.genre_ids);
        movie.genre_ids.forEAch((genreId) => {
          if (!genreIds.includes(genreId)) genreIds.push(genreId);
        });
      });
      console.log(genreIds);
    }

    getPopularMovies(1);
    // eslint-disable-next-line
  }, []);

  const activeMovie =
    selectedId && movies.find((movie) => movie.id === selectedId);

  selectedId && document.body.classList.add("no-scroll");
  !selectedId && document.body.classList.remove("no-scroll");

  return (
    <>
      {selectedId && (
        <ActiveMovieCard
          activeMovie={activeMovie}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}
      <Header />
      <main>
        <h2>Films populaires en ce moment :</h2>
        <div className="movie-cards-container">
          {movies?.map((movie, index) => {
            return (
              <Movie
                key={movie.id + Math.floor(Math.random())}
                movie={movie}
                index={index}
                moviesGenres={moviesGenres}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
