import { createSlice } from '@reduxjs/toolkit'

const defaultSelectedProjectRow = {
  id: 0,
  buildingTypeId: 0,
  buildingMaterialsIds: [0],
  name:"",
  height: 0,
  width: 0,
  length: 0,
  hasUndergroundFloors:false,
  hasElevator:false,
  technicalLeadDensity:0,
  isDraft:false,
  buildingMaterialsNames:[""],
  buildingTypeName: ""
}

export const currentlyProjectRowSlice = createSlice({
  name: 'currentlyProjectRow',
  initialState: {
    row: defaultSelectedProjectRow
  },
  reducers: {
    setCurrentlyProjectRow: (state, action) => {
      state.row = action.payload.row
    }
  },
})

export const { setCurrentlyProjectRow } = currentlyProjectRowSlice.actions

export default currentlyProjectRowSlice.reducer
