import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event_type: null,
  title: null,
  description: null,
  organized_by: null,
  start_date: null,
  end_date: null,
  location: null,
};

const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    addEventType: (state, action) => {
      state.event_type = action;
    },
    addEventMandatory: (state, action) => {
      state.title = action.title;
      state.description = action.description;
      state.organized_by = action.organized_by;
    },
    addEventOptional: (state, action) => {
      state.start_date = action.start_date;
      state.description = action.description;
      state.location = action.location;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addEventType, addEventMandatory, addEventOptional, reset } =
  createEventSlice.actions;

export default createEventSlice.reducer;
