import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <header>
      <motion.nav animate={isOpen ? "open" : "closed"} variants={menuVariants}>
        <ul>
          <motion.li>
            <Link to="/">
              <i className="fa-solid fa-house"></i>
              <p>Accueil</p>
            </Link>
          </motion.li>
          <motion.li>
            <Link to="/favoris">
              <i className="fa-solid fa-heart"></i>
              <p>Favoris</p>
            </Link>
          </motion.li>
        </ul>
      </motion.nav>
      <Link to="/">
        <motion.h1
          animate={{ transform: "translate(-50%, 0%) scale(1)" }}
          className="header-logo"
        >
          REACT MOVIES
        </motion.h1>
      </Link>
      <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <svg viewBox="0 0 23 23">
          <path
            fill="transparent"
            stroke={isOpen ? "#faebd7" : "#800020"}
            strokeLinecap="round"
            d={isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5"}
          ></path>
          <path
            fill="transparent"
            stroke={isOpen ? "#faebd7" : "#800020"}
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            opacity={isOpen ? "0" : "1"}
          ></path>
          <path
            fill="transparent"
            stroke={isOpen ? "#faebd7" : "#800020"}
            strokeLinecap="round"
            d={isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346"}
          ></path>
        </svg>
      </button>
    </header>
  );
};

export default Header;
