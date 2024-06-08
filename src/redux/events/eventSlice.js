import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	headers: [{ link: '/', name: 'Eventos' }]
}

const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		addHeader: (state, action) => {
			state.headers = action.payload;
		},
		resetHeaders: (state) => {
			state.headers = [{ link: '/', name: 'Eventos' }];
		}
	}
});

export const {
	addHeader,
	resetHeaders
} = eventSlice.actions;

export default eventSlice.reducer;
