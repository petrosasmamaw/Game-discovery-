import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/games/gameSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import reviewReducer from "../features/reviews/reviewSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    favorites: favoritesReducer,
    reviews: reviewReducer,
  },
});
