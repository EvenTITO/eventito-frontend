import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  eventId: null,
  eventTitle: null
}

const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		loadEvent: (state, action) => {
			state.roles = action.payload.roles;
			state.eventId = action.payload.eventId;
			state.eventTitle = action.payload.eventTitle;
		},
		reset: (state) => {
			state.roles = [];
      state.eventId = null;
      state.eventTitle = null;
		}
	}
});

export const {
	loadEvent,
	reset
} = eventSlice.actions;

export default eventSlice.reducer;
