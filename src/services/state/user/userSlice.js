import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	error: null,
	loading: false,
	idUser: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.currentUser = null;
			state.loading = false;
			state.error = null;
			state.idUser = null;
		},
		registerStart: (state) => {
			state.loading = true;
			state.error = null;
			state.idUser = null;
		},
		registerSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.idUser = action.payload;
		},
		registerFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.idUser = null;
		},
	}
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
	registerStart,
	registerSuccess,
	registerFailure
} = userSlice.actions;

export default userSlice.reducer;
