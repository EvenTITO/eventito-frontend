import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pricing: null,
  pdfFile: null,
};

const newPaymentSlice = createSlice({
  name: "newPayment",
  initialState,
  reducers: {
    addPaymentChoice: (state, action) => {
      state.pricing = action.payload;
    },
    addPdfPayment: (state, action) => {
      state.pdfFile = action.payload;
    },
    reset: (state) => {
      state.pricing = initialState.pricing;
      state.pdfFile = initialState.pdfFile;
    },
  },
});

export const { addPaymentChoice, addPdfPayment, reset } =
  newPaymentSlice.actions;

export default newPaymentSlice.reducer;
