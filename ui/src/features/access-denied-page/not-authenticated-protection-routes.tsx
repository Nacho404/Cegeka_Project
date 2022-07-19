import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRoles } from "../../core/types";
import { setFormProjectOpen } from "../../store/project-slices/form-project-opened-slice";
import store from "../../store/store";

export const NotAuthenticatedProtectionRoutes = ({children}:any) =>{
  const dispatch = useDispatch();
  dispatch(setFormProjectOpen({isOpen: false}));

  const state = store.getState()
  if (state.user.email != null) {
    toast.warning("Sunteti autentificat.", {toastId: 1})

    if(state.user.role == UserRoles.Administrator){
      return <Navigate to={"/nomenclatoare"} replace />;
    }
    return <Navigate to={"/proiecte"} replace />;
  }

  return children? children: <Outlet/>;
};

