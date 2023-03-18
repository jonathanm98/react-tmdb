import countries from "i18n-iso-countries";
import { motion } from "framer-motion";

const Movie = ({ movie, moviesGenres, setSelectedId, index }) => {
  const dateFormat = (date) => {
    const dateObj = new Date(date);
    const dateFormat = dateObj.toLocaleString("fr-FR", {
      year: "numeric",
      month: "short",
    });
    const output = dateFormat;
    return output;
  };

  return (
    <>
      <motion.div
        id={movie.id}
        className="movie-card"
        onClick={() => setSelectedId(movie.id)}
        initial={{ opacity: 0, y: 50 }}
        animate={{
          transition: { delay: index * 0.06 },
          opacity: 1,
          y: 0,
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`Poster du film : ${movie.title}`}
        />
        <h3>{movie.title}</h3>
        <div className="movie-infos">
          <div className="origin">
            <p>
              Sortie :<span> {dateFormat(movie.release_date)}</span>
            </p>
            <p>
              {movie.original_language === "en"
                ? "États-Unis"
                : countries.getName(movie.original_language, "fr")}
            </p>
          </div>
          <div className="genre">
            <h4>Catégories :</h4>
            <ul>
              {movie.genre_ids.map((genre, index) => {
                return (
                  <li key={genre}>
                    {moviesGenres.map((genreName) => {
                      if (genre === genreName.id) return genreName.name;
                      else return null;
                    })}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Movie;
