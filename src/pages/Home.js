import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ActiveMovieCard from "../components/ActiveMovieCard";
import Header from "../components/Header";
import Movie from "../components/Movie";
import getGenresIds from "../utils/getGenresIds";
import { useInView } from "framer-motion";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [inputTimeout, setInputTimeout] = useState(null);
  const [concatenableMovies, setConcatenableMovies] = useState(false);
  const [enptyInput, setEmptyInput] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [useEffectTrigger, setUseEffectTrigger] = useState(1);
  const [likedMovies, setLikedMovies] = useState(
    JSON.parse(localStorage.getItem("likedMovies")) || []
  );
  // Utilisé pour le lazy loading de la recherche
  const ref = useRef(null);
  const isInView = useInView(ref);

  // Récupération des films populaires au chargement de la page
  useEffect(() => {
    async function getPopularMovies() {
      setMoviesGenres(await getGenresIds(movies));
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&page=1`
        )
        .then((response) => {
          const data = response.data.results;
          setMovies(data);
        });
    }

    getPopularMovies();
    // eslint-disable-next-line
  }, [useEffectTrigger]);

  // Récupération de l'id du film sélectionné au clic sur une carte
  const activeMovie =
    selectedId && movies.find((movie) => movie.id === selectedId);

  // Ajout ou suppression de la classe no-scroll sur le body en fonction de la présence ou non d'un film sélectionné
  selectedId && document.body.classList.add("no-scroll");
  !selectedId && document.body.classList.remove("no-scroll");

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Réinitialisation des données de recherche
    setConcatenableMovies(false);
    setPage(1);

    // Si un timeout est en cours, on le supprime
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }

    // On lance un nouveau timeout pour ne pas lancer la recherche à chaque touche tapée mais seulement après un certain temps
    setInputTimeout(
      setTimeout(async () => {
        await fetchDataFromInput(value);
        setInputValue(value);
        setConcatenableMovies(true);
        setPage(page + 1);
      }, 600)
    );
  };

  // Fonction de recherche
  const fetchDataFromInput = async (value) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/search/multi?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=fr-FR&query=${encodeURIComponent(value)}&page=${page}`
      )
      .then((response) => {
        const data = response.data.results;
        // On filtre les résultats pour ne garder que les films et séries et ceux qui ont une date de sortie
        const filteredData = data.filter(
          (item) => item.media_type !== "person" && item.release_date !== ""
        );
        if (data.length > 0) {
          // si on a des donnés et qu'on est sur la première page, on remplace les données, sinon on concatène
          !concatenableMovies && setMovies(filteredData);
          concatenableMovies && setMovies((movies) => [...movies, ...data]);
          // on met a jour la possibilité de concaténer les données pour le lazy loading
          setEmptyInput(false);
          setConcatenableMovies(true);
          setPage(page + 1);
        } else {
          // sinon on reset les données
          setEmptyInput(true);
          setUseEffectTrigger(0);
        }
      });
  };

  // Fonction de lazy loading
  useEffect(() => {
    const handleScroll = async () => {
      if (isInView) {
        fetchDataFromInput(inputValue);
      }
    };
    handleScroll();
    // eslint-disable-next-line
  }, [isInView]);

  return (
    <>
      {selectedId && (
        <ActiveMovieCard
          activeMovie={activeMovie}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          likedMovies={likedMovies}
          setLikedMovies={setLikedMovies}
        />
      )}
      <Header />
      <main>
        <input
          type="text"
          placeholder="Recherchez un film ou une série"
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
                key={movie.id}
                movie={movie}
                index={index}
                moviesGenres={moviesGenres}
                setSelectedId={setSelectedId}
                likedMovies={likedMovies}
                setLikedMovies={setLikedMovies}
              />
            );
          })}
          {<div className="lazy-load-trigger" ref={ref}></div>}
        </div>
      </main>
    </>
  );
};

export default Home;
