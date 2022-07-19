import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFormProjectOpen } from "../../store/project-slices/form-project-opened-slice";

export function AccessDeniedPage(){
    const dispatch = useDispatch();
    dispatch(setFormProjectOpen({isOpen: false}));

    const navigate = useNavigate();
    return (
        <section>
            <div style={{color: "#3498db"}}>
                <h1 className="text-center">Se pare că te-ai pierdut...</h1>
                <h1>Din păcate accesul dumneavoastră către această pagină nu este permis.</h1>
            </div>

            <div className="gif-container">
            </div>
            
            <Button  
                variant="contained" 
                onClick={() => navigate("/")} 
                style={{color: "white", backgroundColor: "green", marginTop: "10px"}}
            >
                Înapoi la pagină principala
            </Button>
        </section>
    )
}