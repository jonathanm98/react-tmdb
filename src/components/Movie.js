import { motion } from "framer-motion";
import LikeButton from "./LikeButton";
import { v4 as uuidv4 } from "uuid";

const Movie = ({
  movie,
  moviesGenres,
  setSelectedId,
  likedMovies,
  setLikedMovies,
  setDataRefresh,
}) => {
  const uniqueKey = uuidv4();

  const dateFormat = (date) => {
    const dateObj = new Date(date);
    const dateFormat = dateObj.toLocaleString("fr-FR", {
      year: "numeric",
      month: "short",
    });
    const output = dateFormat;
    return output;
  };
  function codeLangueVersNom(code) {
    const langDisplayNames = new Intl.DisplayNames(["fr"], {
      type: "language",
    });
    return langDisplayNames.of(code);
  }

  return (
    <>
      <motion.div
        id={movie.id}
        className="movie-card"
        onClick={() => setSelectedId(movie.id)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : "./img/poster.jpg"
          }
          alt={`Poster du film : ${movie.title}`}
        />
        <LikeButton
          likedMovies={likedMovies}
          setLikedMovies={setLikedMovies}
          movie={movie}
          setDataRefresh={setDataRefresh}
          parentType="little-card"
        />
        <h3>{movie.title ? movie.title : movie.name}</h3>
        <div className="movie-infos">
          <div className="origin">
            <p>
              Sortie :{" "}
              <span>
                {dateFormat(
                  movie.release_date ? movie.release_date : movie.first_air_date
                )}
              </span>
            </p>
            <p>
              Origine :{" "}
              {
                // on utilise Intl.DisplayNames pour afficher le nom du pays en français
                movie.original_language
                  ? codeLangueVersNom(movie.original_language)
                      // On met la première lettre en majuscule
                      .charAt(0)
                      .toUpperCase() +
                    codeLangueVersNom(movie.original_language).slice(1)
                  : "Inconnu"
              }
            </p>
          </div>
          <div className="genre">
            <ul>
              {movie.genre_ids &&
                movie.genre_ids.map((genre, index) => {
                  return (
                    <li key={uniqueKey + index}>
                      {moviesGenres.map((genreName) => {
                        if (genre === genreName.id) return genreName.name;
                        else return null;
                      })}
                    </li>
                  );
                })}
              {movie.genres &&
                movie.genres.map((genre, index) => {
                  return <li key={uniqueKey + index}>{genre.name}</li>;
                })}
            </ul>
          </div>
          <div className="synopsis">
            <p>{movie.overview}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Movie;
