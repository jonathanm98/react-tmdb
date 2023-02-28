import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoris" element={<Favourites />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
