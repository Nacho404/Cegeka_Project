import { createSlice } from '@reduxjs/toolkit'

export const formProjecOpenedSlice = createSlice({
  name: 'formProjecOpened',
  initialState: {
    isOpen: false
  },
  reducers: {
    setFormProjectOpen: (state, action) => {
      state.isOpen = action.payload.isOpen
    }
  },
})

export const { setFormProjectOpen } = formProjecOpenedSlice.actions

export default formProjecOpenedSlice.reducer
