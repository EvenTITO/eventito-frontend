import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
  track: null,
  keywords: null,
};

const newSubmissionSlice = createSlice({
  name: "newSubmission",
  initialState,
  reducers: {
    addTitle: (state, action) => {
      state.title = action.payload;
    },
    addTrack: (state, action) => {
      state.track = action.payload;
    },
    addKeywords: (state, action) => {
      state.keywords = action.payload;
    },
    reset: (state) => {
      state.title = initialState.title;
      state.track = initialState.track;
      state.keywords = initialState.keywords;
    },
  },
});

export const { addTitle, addTrack, addKeywords, reset } =
  newSubmissionSlice.actions;

export default newSubmissionSlice.reducer;
