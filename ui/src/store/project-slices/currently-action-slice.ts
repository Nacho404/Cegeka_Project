import { createSlice } from '@reduxjs/toolkit'

export const currentlyProjectActionSlice = createSlice({
  name: 'currentlyProjectAction',
  initialState: {
    actionType: ""
  },
  reducers: {
    setCurrentlyProjectAction: (state, action) => {
      state.actionType = action.payload.actionType
    }
  },
})

export const { setCurrentlyProjectAction } = currentlyProjectActionSlice.actions

export default currentlyProjectActionSlice.reducer
