import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { setFormProjectOpen } from "../../store/project-slices/form-project-opened-slice";
import store from "../../store/store";

export const AuthenticatedProtectionRoutes = ({redirectPath = "/login", children}:any) =>{
  const dispatch = useDispatch();
  dispatch(setFormProjectOpen({isOpen: false}));
  
  const state = store.getState()
  if (state.user.email == null) {
    toast.warning("Va rugam sa va autentificati.", {toastId: 1})
    return <Navigate to={redirectPath} replace />; 
  }

  return children? children: <Outlet/>;
};

