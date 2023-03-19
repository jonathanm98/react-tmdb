import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import variables from "../style/_variables.scss";
import LikeButton from "./LikeButton";

const ActiveMovieCard = ({
  activeMovie,
  selectedId,
  setSelectedId,
  likedMovies,
  setLikedMovies,
}) => {
  const [distFromTop, setDistFromTop] = useState(0);
  const controls = useAnimation();
  const percentage = (activeMovie.vote_average * 100) / 10;
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  window.addEventListener("scroll", () => {
    const { scrollTop } = document.documentElement;
    setDistFromTop(scrollTop);
  });

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = 20;
    const numberOfSteps = duration / stepTime;
    const increment = (percentage - start) / numberOfSteps;

    const animateNumber = () => {
      if (start < percentage) {
        start += increment;
        setAnimatedPercentage(Math.round(start));
        setTimeout(animateNumber, stepTime);
      } else {
        setAnimatedPercentage(Math.round(percentage));
      }
    };

    setTimeout(() => {
      animateNumber();
    }, 400);
  }, [percentage]);

  useEffect(() => {
    if (selectedId) {
      controls.start("visible");
    } else {
      controls.start("hidden").then(() => {
        setSelectedId(null);
      });
    }
    // eslint-disable-next-line
  }, [selectedId, controls]);

  const [relatedMovies, setRelatedMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/movie/${selectedId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&page=1`
      )
      .then((res) => {
        setRelatedMovies(res.data.results);
        setDistFromTop(document.documentElement.scrollTop);
        console.log(res.data.results);
      });
  }, [selectedId]);

  const variants = {
    origin: { x: "-100%" },
    visible: { x: "0%" },
    hidden: { x: "120%" },
  };

  return (
    <>
      {selectedId && (
        <motion.div
          className="active-card-container"
          style={{ top: `${distFromTop}px` }}
          initial="origin"
          animate={controls}
          exit="hidden"
          variants={variants}
          transition={{
            type: "tween",
            duration: 0.5,
            easeInOut: "easeInOut",
          }}
          onClick={() => {
            controls.start("hidden").then(() => {
              setSelectedId(null);
            });
          }}
        >
          <div className="active-card" onClick={(e) => e.stopPropagation()}>
            <div className="img-container">
              <button
                onClick={() => {
                  controls.start("hidden").then(() => {
                    setSelectedId(null);
                  });
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="rating">
                <div className="outer">
                  <div className="inner">
                    <div id="number">{animatedPercentage + "%"}</div>
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
                      delay: 0.4,
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
              <LikeButton
                likedMovies={likedMovies}
                setLikedMovies={setLikedMovies}
                movie={activeMovie}
                parentType="big-card"
              />
              <h2>{activeMovie.title}</h2>
              <p>{activeMovie.overview}</p>
              {relatedMovies.length > 0 && (
                <div className="related-movies-container">
                  <h3>Films similaires :</h3>
                  <ul>
                    {relatedMovies.slice(0, 10).map((movie, index) => {
                      return (
                        <li key={movie.id + index}>
                          <div className="card-container">
                            <img
                              src={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                  : "./img/poster.jpg"
                              }
                              alt={"poster de film " + movie.title}
                            />
                            <h3>{movie.title}</h3>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ActiveMovieCard;
