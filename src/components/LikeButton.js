import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";

const LikeButton = ({
  movie,
  parentType,
  likedMovies,
  setLikedMovies,
  setDataRefresh,
}) => {
  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  const handleClick = (e) => {
    e.stopPropagation();

    if (likedMovies.includes(movie.id)) {
      setLikedMovies(likedMovies.filter((id) => id !== movie.id));
    } else {
      setLikedMovies([...likedMovies, movie.id]);
    }
    setDataRefresh && setDataRefresh(true);
  };

  return (
    <div className={"like-button " + parentType} onClick={handleClick}>
      <AnimatePresence>
        {likedMovies.includes(movie.id) ? (
          <FontAwesomeIcon icon="fa-solid fa-heart" />
        ) : (
          <FontAwesomeIcon icon="fa-regular fa-heart" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LikeButton;
