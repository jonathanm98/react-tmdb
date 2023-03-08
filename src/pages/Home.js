import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
      )
      .then((res) => {
        setMovies(res.data.results);
        console.log(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header />
      <main>
        <h2>Home</h2>
      </main>
    </>
  );
};

export default Home;
