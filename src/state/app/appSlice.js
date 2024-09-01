import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  serverError: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    serverOk: (state) => {
      state.serverError = false;
    },
    serverDown: (state) => {
      state.serverError = true;
    },
  },
});

export const { startLoading, endLoading, serverOk, serverDown } =
  appSlice.actions;

export default appSlice.reducer;
