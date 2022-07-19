import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function AccessDeniedPage(){
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
                onClick={() => navigate("/proiecte")} 
                style={{color: "white", backgroundColor: "green", marginTop: "10px"}}
            >
                Înapoi la proiecte
            </Button>
        </section>
    )
}