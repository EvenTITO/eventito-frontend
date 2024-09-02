import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
}

const userEventSlice = createSlice({
	name: 'userEvent',
	initialState,
	reducers: {
		loadUserEvent: (state, action) => {
			state.roles = action.payload;
		},
		clear: (state) => {
			state.roles = [];
		},
	}
});

export const {
	loadUserEvent,
	clear,
} = userEventSlice.actions;

export default userEventSlice.reducer;

