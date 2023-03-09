import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Movie from "../components/Movie";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState(20);

  useEffect(() => {
    async function getPopularMovies() {
      for (let i = 1; i < 501; i++) {
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&page=${i}`
          )
          .then((response) => {
            const data = response.data.results;
            if (data.length > 0) setMovies((movies) => [...movies, ...data]);
          });
      }
    }

    getPopularMovies(1);
  }, []);

  return (
    <>
      <Header />
      <main>
        <h2>Films populaires en ce moment :</h2>
        <div className="home-card-container">
          {movies?.slice(0, moviesCount).map((movie) => {
            return <Movie movie={movie} />;
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
