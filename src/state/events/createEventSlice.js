import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  event_type: null,
  title: null,
  description: null,
  organized_by: null,
  start_date: null,
  end_date: null,
  location: null,
}

const createEventSlice = createSlice({
  name: 'createEvent',
  initialState,
  reducers: {
    addEventType: (state, action) => {
      state.event_type = action.payload
    },
    addEventMandatory: (state, action) => {
      state.title = action.payload.title
      state.description = action.payload.description
      state.organized_by = action.payload.organized_by
    },
    addEventOptional: (state, action) => {
      state.start_date = action.payload.startDate
      state.end_date = action.payload.endDate
      state.location = action.payload.location
    },
    reset: (state) => {
      state = initialState
    },
  },
})

export const { addEventType, addEventMandatory, addEventOptional, reset } =
  createEventSlice.actions

export default createEventSlice.reducer
