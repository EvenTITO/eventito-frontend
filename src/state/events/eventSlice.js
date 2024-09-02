import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: []
}

const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		loadEvent: (state, action) => {
			state.roles = action.payload;
		},
		reset: (state) => {
			state.roles = [];
		}
	}
});

export const {
	loadEvent,
	reset
} = eventSlice.actions;

export default eventSlice.reducer;
