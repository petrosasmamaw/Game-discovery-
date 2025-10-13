import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectFavoriteItems, removeFromFavorites } from "./favoritesSlice";

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(selectFavoriteItems);

    const handleRemove = (item) => {
      dispatch(removeFromFavorites(item));
    };
    return (
    <div className="container">
      <h2 className="page__title">❤️ Your Favorite Games</h2>
      <div className="grid grid--favorites">
        {favoriteItems.map((game) => (
          <div key={game.id} className="card favorite-card">
            <img className="card__image" src={game.background_image} alt={game.name} />
            <h3 className="card__title">{game.name}</h3>
            <div className="card__actions">
              <Link className="btn" to={`/game/${game.id}`}>View</Link>
              <button className="btn btn--danger" onClick={() => handleRemove(game)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}
export default FavoritesList;