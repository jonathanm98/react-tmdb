import axios from "axios";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import Movie from "../components/Movie";
import variables from "../style/_variables.scss";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [distFromTop, setDistFromTop] = useState(0);

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

  window.addEventListener("scroll", () => {
    const { scrollTop } = document.documentElement;
    setDistFromTop(scrollTop);
  });

  return (
    <>
      <AnimatePresence>
        {selectedId && (
          <motion.div
            style={{ top: distFromTop }}
            className="active-card-container"
            initial={{ x: "-100%" }}
            animate={{ x: "0" }}
            exit={{ x: "110%" }}
            transition={{
              type: "spring",
              duration: 0.75,
              easeInOut: "ease-in-out",
            }}
          >
            <motion.div className="active-card">
              <div className="img-container">
                <motion.button
                  placeholder="close"
                  onClick={() => setSelectedId(null)}
                >
                  <svg viewBox="0 0 23 23">
                    <path
                      fill="transparent"
                      stroke={variables.c1}
                      strokeLinecap="round"
                      d="M 3 16.5 L 17 2.5"
                    ></path>
                    <path
                      fill="transparent"
                      stroke={variables.c1}
                      strokeLinecap="round"
                      d="M 3 2.5 L 17 16.346"
                    ></path>
                  </svg>
                </motion.button>
                <motion.img
                  src={`https://image.tmdb.org/t/p/original${activeMovie.backdrop_path}`}
                  alt={`Poster du film : ${activeMovie.title}`}
                />
                <div className="filter"></div>
              </div>
              <motion.h2>{activeMovie.title}</motion.h2>
              <motion.p>
                {" "}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Architecto ad adipisci asperiores nulla consequatur illum
                similique eveniet deserunt libero dolore doloremque, expedita
                corrupti eos ex a repellat quisquam distinctio est aspernatur,
                sit aut sint, facilis aliquid veritatis. Repellendus deleniti
                repudiandae reprehenderit quaerat necessitatibus, fugiat placeat
                rem fuga ipsum rerum et fugit aspernatur asperiores laudantium
                deserunt est, delectus nesciunt minus voluptatum corrupti. Earum
                id expedita nam! Porro sequi totam provident rerum voluptatibus
                commodi tempore libero quibusdam, culpa dolorum sapiente modi
                quia assumenda voluptas nostrum quo nemo odit explicabo ad
                suscipit tempora accusantium laborum? Sunt non odio impedit
                voluptates iure modi iusto?
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
