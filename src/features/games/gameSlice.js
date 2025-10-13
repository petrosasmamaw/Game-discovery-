import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = '1799f2242aa54bf292bf04105b93d58c';

export const fetchGames = createAsyncThunk("game/fetchGames", async (searchTerm = "") => {
  const url = searchTerm
    ? `${BASE_URL}/games?search=${searchTerm}&page_size=20&key=${API_KEY}`
    : `${BASE_URL}/games?page_size=20&key=${API_KEY}`;
  const res = await axios.get(url);
  return res.data.results;
});

export const fetchGameDetail = createAsyncThunk("game/fetchGameDetail", async (id) => {
  const url = `${BASE_URL}/games/${id}?key=${API_KEY}`;
  const res = await axios.get(url);
  return res.data;
});

const gameSlice = createSlice({
  name: "game",
  initialState: {
    games: [],
    gameDetail: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchGameDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGameDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gameDetail = action.payload;
      })
      .addCase(fetchGameDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectGames = (state) => state.game.games;
export const selectSelectedGame = (state) => state.game.gameDetail;
export const selectSelectedGameStatus = (state) => state.game.status;
export const selectSelectedGameError = (state) => state.game.error;

export default gameSlice.reducer;
