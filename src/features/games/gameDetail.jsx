import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchGameDetail,
  selectSelectedGame,
  selectSelectedGameError,
  selectSelectedGameStatus,
} from "./gameSlice";
import { addToFavorites } from "../favorites/favoritesSlice";
import ReviewList from "../reviews/reviewList";

const GameDetail = () => {
  const dispatch = useDispatch();
  const selectedGame = useSelector(selectSelectedGame);
  const error = useSelector(selectSelectedGameError);
  const status = useSelector(selectSelectedGameStatus);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGameDetail(id));
  }, [dispatch, id]);

  const handleAddToFavorites = () => {
    if (selectedGame) dispatch(addToFavorites(selectedGame));
    navigate("/favorites");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="page page--detail">
      <div className="container">
        <article className="detail-card">
          <header className="detail-card__header">
            <h2 className="detail-card__title">{selectedGame?.name}</h2>
          </header>
          {selectedGame?.background_image && (
            <img className="detail-card__image" src={selectedGame.background_image} alt={selectedGame.name} />
          )}
          <div className="detail-card__content">
            <p className="detail-card__description">{selectedGame?.description_raw}</p>
            <button className="btn favorite-btn" onClick={handleAddToFavorites}>❤️ Add to Favorites</button>
          </div>
        </article>
        <section className="reviews">
          <h3 className="reviews__title">Reviews</h3>
          <ReviewList userId={id} />
        </section>
      </div>
    </section>
  );
};

export default GameDetail;
