import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { ActionsTypesFrom } from "../../core/types";
import { Project } from "../../models/project/project-model";
import { insertProject, updateProject } from "../../services/project.api.service";
import store from "../../store/store";
import { useNavigate } from "react-router-dom";
import BuildingTypesSelect from "./building-types-select";
import BuildingMaterialsMultiSelect from "./building-materials-multiSelect";
import { useDispatch } from "react-redux";
import { setFormProjectOpen } from "../../store/project-slices/form-project-opened-slice";
import { validationMessage } from "../../core/types";

const validationSchema = yup.object({
    name: yup.string().required(validationMessage),
    buildingTypeId: yup.string().required(validationMessage),
    height: yup.string().required(validationMessage),
    width: yup.string().required(validationMessage),
    length: yup.string().required(validationMessage),
    technicalLeadDensity: yup.string().required(validationMessage),
    buildingMaterialsIds: yup.array().min(1, 'Adauga materiale')
});

export function AddOrEditProject(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentlyRowSelected = store.getState().currentlyProjectRow.row;
    const currentlyActionType = store.getState().currentlyProjectAction.actionType;

    let stringBuildingTypeId = "";
    if(currentlyRowSelected.buildingTypeId != 0){
        stringBuildingTypeId = currentlyRowSelected.buildingTypeId.toString();
    }
    const formik = useFormik({
        initialValues: {
            name: currentlyRowSelected.name,
            buildingTypeId: stringBuildingTypeId, //this is a special aproach for bulding types select
            buildingMaterialsIds: currentlyRowSelected.buildingMaterialsIds,
            height: currentlyRowSelected.height,
            width: currentlyRowSelected.width,
            length: currentlyRowSelected.length,
            hasUndergroundFloors:currentlyRowSelected.hasUndergroundFloors,
            hasElevator:currentlyRowSelected.hasElevator,
            technicalLeadDensity:currentlyRowSelected.technicalLeadDensity,
            isDraft:currentlyRowSelected.isDraft,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          const editEntity = () => {

            const project: Project = createProjectEntity(values);
            updateProject(project, currentlyRowSelected.id)
            .then(() => {
                navigate("/proiecte");
            });
          }
    
          const addEntity = () => {

            const project: Project = createProjectEntity(values);
            insertProject(project)
            .then(() => {
                navigate("/proiecte");
            });
          }
          if (currentlyActionType == ActionsTypesFrom.Edit) editEntity();
          if (currentlyActionType == ActionsTypesFrom.Add) addEntity();
        }
    });

    function createProjectEntity(myValues: any){
        const projectEntity = {
            name: myValues.name,
            buildingTypeId: parseInt(myValues.buildingTypeId,10),
            buildingMaterialsIds: myValues.buildingMaterialsIds,
            height: myValues.height,
            width: myValues.width,
            length: myValues.depth,
            hasUndergroundFloors: myValues.hasUndergroundFloors,
            hasElevator: myValues.hasElevator,
            technicalLeadDensity: myValues.technicalLeadDensity,
            isDraft: myValues.isDraft,
        };
        return projectEntity;
    }

    function handleClickCloseFormular(){
        dispatch(setFormProjectOpen({isOpen: true}));
        navigate("/proiecte");
    }
    
    dispatch(setFormProjectOpen({isOpen: false}))
    
    return(
        <>
        {currentlyActionType == ActionsTypesFrom.Edit?
            <h1>{currentlyActionType} PROIECTUL</h1>: <h1>{currentlyActionType} PROIECT</h1>
        }
        <form 
            onSubmit={formik.handleSubmit} 
            style={{border: "2px solid gray", margin: "3px", borderRadius: "10px"}}
        >
            <div id="container-add-edit-project">
                <div id="text-fields-container">
                    <TextField
                        style={{ width: 500, marginTop: "20px" }}
                        id="name"
                        name="name"
                        label="Nume"
                        placeholder={currentlyRowSelected.name}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}>
                    </TextField>


                    <TextField
                        style={{ width: 500, marginTop: "20px" }}
                        id="width"
                        name="width"
                        label="Latime"
                        type="number"
                        placeholder={currentlyRowSelected.width.toString()}
                        value={formik.values.width}
                        onChange={formik.handleChange}
                        error={formik.touched.width && Boolean(formik.errors.width)}
                        helperText={formik.touched.width && formik.errors.width}>
                    </TextField>

                    <TextField
                        style={{ width: 500, marginTop: "20px" }}
                        id="height"
                        name="height"
                        label="Inaltime"
                        type="number"
                        placeholder={currentlyRowSelected.height.toString()}
                        value={formik.values.height}
                        onChange={formik.handleChange}
                        error={formik.touched.height && Boolean(formik.errors.height)}
                        helperText={formik.touched.height && formik.errors.height}>
                    </TextField>

                    <TextField
                        style={{ width: 500, marginTop: "20px" }}
                        id="length"
                        name="length"
                        label="Adancime"
                        type="number"
                        placeholder={currentlyRowSelected.length.toString()}
                        value={formik.values.length}
                        onChange={formik.handleChange}
                        error={formik.touched.length && Boolean(formik.errors.length)}
                        helperText={formik.touched.length && formik.errors.length}>
                    </TextField>

                    <TextField
                        style={{ width: 500, marginTop: "20px" }}
                        id="technicalLeadDensity"
                        name="technicalLeadDensity"
                        label="Densitatea plumbului"
                        type="number"
                        placeholder={currentlyRowSelected.technicalLeadDensity.toString()}
                        value={formik.values.technicalLeadDensity}
                        onChange={formik.handleChange}
                        error={formik.touched.technicalLeadDensity && Boolean(formik.errors.technicalLeadDensity)}
                        helperText={formik.touched.technicalLeadDensity && formik.errors.technicalLeadDensity}>
                    </TextField>
                </div>

                <div id="selects-form-container">
                    <BuildingTypesSelect formik={formik} currentBuildingTypeId={formik.values.buildingTypeId}/>
                    
                    <BuildingMaterialsMultiSelect formik={formik} currentlyRowSelected={currentlyRowSelected}/>
                </div>

                <div id="checkboxes-container">
                    <FormControlLabel
                        control={<Checkbox />}
                        name = "hasUndergroundFloors"
                        label="Subteran"
                        checked = {formik.values.hasUndergroundFloors}
                        onChange = {(e) => formik.handleChange(e)}
                    />

                    <FormControlLabel
                        control={<Checkbox />} 
                        name = "hasElevator"
                        label="Lift"
                        checked = {formik.values.hasElevator}
                        onChange = {(e) => formik.handleChange(e)}
                    />

                    <FormControlLabel
                        control={<Checkbox />}
                        name = "isDraft"
                        label="Draft"
                        checked = {formik.values.isDraft}
                        onChange = {(e) => formik.handleChange(e)}
                    />
                </div>
            </div>

            <div id="project-form-buttons">
                <Button className="button-formular-style" type="submit">{currentlyActionType}</Button>
                <Button className="button-formular-style" onClick={handleClickCloseFormular}>RENUNȚĂ</Button>
            </div>
        </form>
        </>
    )
}