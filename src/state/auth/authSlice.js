import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  idUser: null,
  email: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.idUser = action.payload.idUser
      state.email = action.payload.email
    },
    setIdUser: (state, action) => {
      state.idUser = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    clearAuth: (state) => {
      state.idUser = initialState.idUser
      state.email = initialState.email
    },
  },
})

export const { register, setIdUser, setEmail, clearAuth } = authSlice.actions

export default authSlice.reducer
