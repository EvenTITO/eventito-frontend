import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
  track: null,
  keywords: null,
  abstract: null,
  pdfFile: null,
};

const newWorkSlice = createSlice({
  name: "newWork",
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
    addAbstract: (state, action) => {
      state.abstract = action.payload;
    },
    addPdfFile: (state, action) => {
      state.pdfFile = action.payload;
    },
    reset: (state) => {
      state.title = initialState.title;
      state.track = initialState.track;
      state.keywords = initialState.keywords;
      state.abstract = initialState.abstract;
      state.pdfFile = initialState.pdfFile;
    },
  },
});

export const {
  addTitle,
  addTrack,
  addKeywords,
  addAbstract,
  addPdfFile,
  reset,
} = newWorkSlice.actions;

export default newWorkSlice.reducer;
