import { createSlice } from '@reduxjs/toolkit'

export const currentlySelectedParentSlice = createSlice({
  name: 'currentlySelectedParent',
  initialState: {
    parentId: 1
  },
  reducers: {
    setCurrentParent: (state, action) => {
      state.parentId = action.payload.parentId
    }
  },
})

export const { setCurrentParent } = currentlySelectedParentSlice.actions

export default currentlySelectedParentSlice.reducer
