import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
    role: null
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.role = action.payload.role
    },
    removeUser: (state, action) => {
      state.name = null
      state.email = null
      state.role = null
    }
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
