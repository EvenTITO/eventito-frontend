import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pricing: null,
  paymentPDF: null,
  affiliationPDF: null,
  worksIds: [],
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
    addWorkId: (state, action) => {
      if (!state.worksIds) {
        state.worksIds = [];
      }
      if (!state.worksIds.includes(action.payload)) {
        state.worksIds.push(action.payload);
      }
    },
    removeWorkId: (state, action) => {
      if (state.worksIds) {
        state.worksIds = state.worksIds.filter((id) => id !== action.payload);
      }
    },
    reset: (state) => {
      state.pricing = initialState.pricing;
      state.paymentPDF = initialState.paymentPDF;
      state.affiliationPDF = initialState.affiliationPDF;
      state.worksIds = initialState.worksIds;
    },
  },
});

export const {
  addPaymentChoice,
  addPdfPayment,
  addPdfAffiliation,
  addWorkId,
  removeWorkId,
  reset,
} = newPaymentSlice.actions;

export default newPaymentSlice.reducer;
