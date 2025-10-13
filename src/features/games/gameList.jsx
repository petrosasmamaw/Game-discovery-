import React, { useEffect, useState } from "react";
import button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../components/searchBar.jsx";
import { fetchGames, selectGames, selectSelectedGameError, selectSelectedGameStatus } from "./gameSlice";
import { addToFavorites, removeFromFavorites, selectFavoriteItems } from "../favorites/favoritesSlice";

const GameList = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectGames);
  const status = useSelector(selectSelectedGameStatus);
  const error = useSelector(selectSelectedGameError);
  const favorites = useSelector(selectFavoriteItems);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchGames(searchTerm));
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, searchTerm]);

  const isFavorite = (id) => favorites.some((f) => f.id === id);
  const toggleFavorite = (game) => {
    if (isFavorite(game.id)) dispatch(removeFromFavorites(game));
    else dispatch(addToFavorites(game));
  };

  const handleSearchChange = (value) => setSearchTerm(value);
  return (
    <section className="page page--games">
      <div className="container">
        <header className="page__header games-header">
          <h1 className="page__title">Discover games</h1>
          <p className="page__subtitle">{games?.length ? `${games.length} titles` : ""}</p>
          <SearchBar setSearchTerm={handleSearchChange} value={searchTerm} />
        </header>

        {status === "loading" && (
          <p className="status status--loading">Loading games…</p>
        )}
        {status === "failed" && (
          <p className="status status--error">Error: {error ?? "Unknown error"}</p>
        )}

        {status === "succeeded" && games.length === 0 && (
          <p className="status">No games matched your search.</p>
        )}

        <div className="grid grid--games">
          {games.map((game) => (
            <article key={game.id} className="card game-card">
              {game.background_image && (
                <img
                  className="card__image game-card__image"
                  src={game.background_image}
                  alt={game.name}
                />
              )}
              <div className="card__content game-card__content">
                <h2 className="card__title">{game.name}</h2>
                <p className="card__meta">Rating: {game.rating ?? "N/A"}</p>
                <div className="card__actions game-card__actions">
                  <Link to={`/game/${game.id}`} className="btn">
                    View details
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(game)}
                    className={`btn btn--secondary ${
                      isFavorite(game.id) ? "is-active" : ""
                    }`}
                  >
                    {isFavorite(game.id) ? "Remove favorite" : "Add favorite"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameList;
