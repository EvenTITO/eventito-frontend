import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pricing: null,
  paymentPDF: null,
  affiliationPDF: null,
};

const newPaymentSlice = createSlice({
  name: "newPayment",
  initialState,
  reducers: {
    addPaymentChoice: (state, action) => {
      state.pricing = action.payload;
    },
    addPdfPayment: (state, action) => {
      state.paymentPDF = action.payload;
    },
    addPdfAffiliation: (state, action) => {
      state.affiliationPDF = action.payload;
    },
    reset: (state) => {
      state.pricing = initialState.pricing;
      state.paymentPDF = initialState.paymentPDF;
      state.affiliationPDF = initialState.affiliationPDF;
    },
  },
});

export const { addPaymentChoice, addPdfPayment, addPdfAffiliation, reset } =
  newPaymentSlice.actions;

export default newPaymentSlice.reducer;
