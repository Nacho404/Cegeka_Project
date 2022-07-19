import { Button} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFormProjectOpen } from "../../store/project-slices/form-project-opened-slice";
import { getNormativeByBuildingType } from "../../services/normative.buildingtype.api.service";
import { NormativeElement } from '../../models/normative/normative-model';
import store from "../../store/store";
import DOMPurify from "dompurify";


export function ViewProjectPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const currentlyRowSelected = store.getState().currentlyProjectRow.row;

    function handleClickGoToProjectsPage(){
        dispatch(setFormProjectOpen({isOpen: false}))
        navigate("/proiecte");
    }

    dispatch(setFormProjectOpen({isOpen: false}))

    const [normative, setNormative] = useState<NormativeElement[]>([]);

    useEffect(()=>{
        getNormativeByBuildingType(currentlyRowSelected.buildingTypeId).then(ne =>{
            setNormative(ne)
        })
    },[])    

    return(
        <div id="details-view-page-container">
            <div id="details">
               <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "column"}}>
                    <Button onClick={handleClickGoToProjectsPage} variant="contained">Înapoi la proiecte</Button>
                    <h1 style={{marginTop: 0}}>Nume  proiect: <span>{currentlyRowSelected.name}</span></h1>
               </div>

                <div>
                    <h3>Latimea:  <span>{currentlyRowSelected.width} mm</span> </h3>
                    <h3>Inaltime:  <span>{currentlyRowSelected.height} mm</span> </h3>
                    <h3>Adancime:  <span>{currentlyRowSelected.length} mm</span></h3>
                </div>

                <div>
                    <h3>Densitatea plumbului:  <span>{currentlyRowSelected.technicalLeadDensity}</span> </h3>
                    <h3>Tipul de cladire:  <span>{currentlyRowSelected.buildingTypeName}</span> </h3>
                    <h3 style={{display: "flex", flexFlow: "row"}}>
                        {/* Materiale de constructie: <span>{buildingMaterialsNamesString.slice(0, -1)} </span> */}
                        <section style={{alignSelf: "center", marginRight: 10}}>Materiale de constructie:</section> 
                        <ul id="project-building-materials-list">
                            {currentlyRowSelected.buildingMaterialsNames.map((name)=> <li>{name}</li>)}
                        </ul>
                    </h3>
                </div>

                <div>
                    <h3>Subteran: {currentlyRowSelected.hasUndergroundFloors? <span>Da</span> : <span>Nu</span>}</h3>
                    <h3>Lift: {currentlyRowSelected.hasElevator? <span>Da</span> : <span>Nu</span>}</h3>
                    <h3>Draft: {currentlyRowSelected.isDraft? <span>Da</span> : <span>Nu</span>}</h3>
                </div>
            </div>

            <h1 id="title-normative">Normativ in baza tipului de cladire: <span>{currentlyRowSelected.buildingTypeName}</span></h1>

            <div id="scrollable-normative">
                <ul style={{ listStyleType: "none"}} >
                {normative.map((norm, index) =>( <><li key={index} style={{ display:"flex"}}> {norm.title } </li>
                                                   <li key={index} style={{ display:"flex", marginLeft: '2rem'}} > <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(norm.content, {FORCE_BODY: true})}} /> </li>
                                                </>))} 
                </ul>  
            </div>
        </div>
    )
}