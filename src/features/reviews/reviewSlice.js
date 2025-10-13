import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const MOCK_API = 'https://68972041250b078c20410a01.mockapi.io/notes/database/users';

export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async (gameid) => {
    const response = await axios.get(`${MOCK_API}?gameId=${gameid}`);
    return response.data;
});
    
export const addReview = createAsyncThunk("reviews/addReview", async (reviewData) => {
    const response = await axios.post(MOCK_API, reviewData);
    return response.data;
});
export const deleteReview = createAsyncThunk("reviews/deleteReview", async (reviewId) => {
    const response = await axios.delete(`${MOCK_API}/${reviewId}`);
    return reviewId;
});

const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        List: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.List = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                 state.List = state.List.filter((r) => r.id !== action.payload);
                    });
    }
});

export default reviewSlice.reducer;
