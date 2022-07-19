import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserRoles } from "../../core/types";
import store from "../../store/store";
import ApplicationBar from "../application-bar";

export function MainLayout() {
    const state = store.getState();
    const navigate = useNavigate();
    const location = useLocation()

    const [isRedirected, setIsRedirected] = useState(false);

    function redirectAccordingRole(){
        if(state.user.email != null){

            if(state.user.role == UserRoles.Administrator){
            navigate('/nomenclatoare');
            }

            if(state.user.role == UserRoles.Architect){
            navigate('/proiecte');
            }
        }
        setIsRedirected(true);
    }

    useEffect(() => {
        if(!isRedirected && location.pathname == "/"){
            redirectAccordingRole();
        }
    });

  
    return (<>
        <div className="App">
            <ApplicationBar></ApplicationBar>
            <div className='main-content'>
                <Outlet />
            </div>
        </div></>);
}
