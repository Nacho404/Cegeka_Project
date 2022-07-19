import { Navigate, Outlet } from "react-router-dom";
import { UserRoles } from "../../core/types";
import store from "../../store/store";

export const RolesProtectionRoutes = ({redirectPath = "/accesulinterzis", children}:any) =>{
    const state = store.getState()
    if(state.user.role != UserRoles.Administrator){
        return <Navigate to={redirectPath} replace />;
    }

    return children? children: <Outlet/>;
};

