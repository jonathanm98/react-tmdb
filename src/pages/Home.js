import axios from "axios";
import React, { useState, useEffect } from "react";
import ActiveMovieCard from "../components/ActiveMovieCard";
import Header from "../components/Header";
import Movie from "../components/Movie";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [inputTimeout, setInputTimeout] = useState(null);
  const [concatenableMovies, setConcatenableMovies] = useState(false);
  const [enptyInput, setEmptyInput] = useState(true);
  const [page, setPage] = useState(1);
  const [useEffectTrigger, setUseEffectTrigger] = useState(1);

  useEffect(() => {
    async function getPopularMovies() {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
        )
        .then((response) => {
          const data = response.data.genres;
          data.push({ id: 10762, name: "Enfants" });
          data.push({ id: 10765, name: "Sci-Fi & Fantasie" });
          data.push({ id: 10759, name: "Action & Aventure" });
          data.push({ id: 10768, name: "Guerre & Politique" });
          setMoviesGenres(data);
        });

      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&page=1`
        )
        .then((response) => {
          const data = response.data.results;
          setMovies(data);
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
  }, [useEffectTrigger]);

  const activeMovie =
    selectedId && movies.find((movie) => movie.id === selectedId);

  selectedId && document.body.classList.add("no-scroll");
  !selectedId && document.body.classList.remove("no-scroll");

  const handleInputChange = (e) => {
    setPage(1);
    setConcatenableMovies(false);
    const value = e.target.value;

    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }

    setInputTimeout(
      setTimeout(() => {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/search/multi?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=fr-FR&query=${encodeURIComponent(value)}&page=${page}`
          )
          .then((response) => {
            const data = response.data.results;
            const filteredData = data.filter(
              (item) => item.media_type !== "person" && item.release_date !== ""
            );
            console.log(filteredData);
            if (data.length > 0) {
              !concatenableMovies && setMovies(filteredData);
              concatenableMovies && setMovies((movies) => [...movies, ...data]);
              setEmptyInput(false);
              setConcatenableMovies(true);
              setPage(page + 1);
            } else {
              setEmptyInput(true);
              setUseEffectTrigger(0);
            }
          });
      }, 500)
    );
  };

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
        <input
          type="text"
          placeholder="Recherchez un film"
          onChange={handleInputChange}
        />
        <h2>
          {enptyInput
            ? "Films populaires en ce moment :"
            : "Résultat de votre recherche :"}
        </h2>
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
