import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import currentlyProjectRowReducer from "./project-slices/currently-row-slice"
import currentlyProjectActionReducer from "./project-slices/currently-action-slice"
import formProjecOpenedReducer from "./project-slices/form-project-opened-slice"
import currentlySelectedParentReducer from "./normative-slice"

export default configureStore({
  reducer: {
    user: userReducer,
    currentlyProjectRow: currentlyProjectRowReducer,
    currentlyProjectAction: currentlyProjectActionReducer,
    formProjecOpened: formProjecOpenedReducer,
    currentlySelectedParent: currentlySelectedParentReducer
  },
})