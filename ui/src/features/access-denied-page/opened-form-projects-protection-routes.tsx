import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import store from "../../store/store";

export const OpenedFormProjectsProtectionRoutes = ({redirectPath = "/proiecte", children}:any) =>{
  const state = store.getState()
  if (!state.formProjecOpened.isOpen) {
    toast.warning("Accesul acestei pagini se realizeaza doar prin butoanele de actiune: 'Editeaza', 'Adauga' sau 'Vizualizeaza'.", {toastId: 1})
    return <Navigate to={redirectPath} replace />;
  }

  return children? children: <Outlet/>;
};