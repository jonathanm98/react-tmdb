import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import variables from "../style/_variables.scss";

const ActiveMovieCard = ({ activeMovie, selectedId, setSelectedId }) => {
  const [distFromTop, setDistFromTop] = useState(0);

  window.addEventListener("scroll", () => {
    const { scrollTop } = document.documentElement;
    setDistFromTop(scrollTop);
  });
  const [relatedMovies, setRelatedMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/movie/${selectedId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&page=1`
      )
      .then((res) => {
        setRelatedMovies(res.data.results);
        setDistFromTop(document.documentElement.scrollTop);
      });
  }, [selectedId]);

  return (
    <AnimatePresence>
      {selectedId && (
        <motion.div
          className="active-card-container"
          style={{ top: `${distFromTop}px` }}
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "120%" }}
          transition={{
            type: "spring",
            duration: 0.75,
            easeInOut: "linear",
          }}
          onClick={() => setSelectedId(null)}
        >
          <div className="active-card" onClick={(e) => e.stopPropagation()}>
            <div className="img-container">
              <button onClick={() => setSelectedId(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="rating">
                <div className="outer">
                  <div className="inner">
                    <div id="number">
                      {(activeMovie.vote_average * 100) / 10 + "%"}
                    </div>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="120px"
                  height="120px"
                >
                  <defs>
                    <linearGradient id="Color">
                      <stop offset="0%" stopColor={variables.c1} />
                      <stop offset="100%" stopColor={variables.c4} />
                    </linearGradient>
                  </defs>
                  <motion.circle
                    className="circle-bg"
                    initial={{ strokeDashoffset: 340 }}
                    animate={{
                      strokeDashoffset:
                        340 - (340 * activeMovie.vote_average) / 10,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                    }}
                    cx="60"
                    cy="60"
                    r="53"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/original${activeMovie.backdrop_path}`}
                alt={`Poster du film : ${activeMovie.title}`}
              />
              <div className="filter"></div>
            </div>

            <div className="content-container">
              <h2>{activeMovie.title}</h2>
              <p>{activeMovie.overview}</p>
              {relatedMovies.length > 0 && (
                <div className="related-movies-container">
                  <h3>Films similaires :</h3>
                  <ul>
                    {relatedMovies.slice(0, 10).map((movie, index) => {
                      console.log(movie);
                      return <li key={movie.id + index}>{movie.title}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActiveMovieCard;