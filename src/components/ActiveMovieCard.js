import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import variables from "../style/_variables.scss";

const ActiveMovieCard = ({ activeMovie, selectedId, setSelectedId }) => {
  const [distFromTop, setDistFromTop] = useState(0);

  window.addEventListener("scroll", () => {
    const { scrollTop } = document.documentElement;
    setDistFromTop(scrollTop);
  });

  return (
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
          <div className="active-card">
            <div className="img-container">
              <button placeholder="close" onClick={() => setSelectedId(null)}>
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
              </button>
              <img
                src={`https://image.tmdb.org/t/p/original${activeMovie.backdrop_path}`}
                alt={`Poster du film : ${activeMovie.title}`}
              />
              <div className="filter"></div>
            </div>
            <h2>{activeMovie.title}</h2>
            <p>
              {" "}
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Architecto ad adipisci asperiores nulla consequatur illum
              similique eveniet deserunt libero dolore doloremque, expedita
              corrupti eos ex a repellat quisquam distinctio est aspernatur, sit
              aut sint, facilis aliquid veritatis. Repellendus deleniti
              repudiandae reprehenderit quaerat necessitatibus, fugiat placeat
              rem fuga ipsum rerum et fugit aspernatur asperiores laudantium
              deserunt est, delectus nesciunt minus voluptatum corrupti. Earum
              id expedita nam! Porro sequi totam provident rerum voluptatibus
              commodi tempore libero quibusdam, culpa dolorum sapiente modi quia
              assumenda voluptas nostrum quo nemo odit explicabo ad suscipit
              tempora accusantium laborum? Sunt non odio impedit voluptates iure
              modi iusto?
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActiveMovieCard;
