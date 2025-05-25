import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MoviesGrid from "./components/MoviesGrid";
import { WatchList } from "./components/Watchlist";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch("/movies.json");
    const data = await response.json();
    setMovies(data);
  };

  const toggleWatchList = (movieId) => {
    setWatchlist((prev) => (prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]));
  };

  return (
    <div className="App">
      <div className="container">
        <Header />

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<MoviesGrid movies={movies} watchlist={watchlist} toggleWatchList={toggleWatchList} />} />
            <Route path="/watchlist" element={<WatchList movies={movies} watchlist={watchlist} toggleWatchList={toggleWatchList} />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
