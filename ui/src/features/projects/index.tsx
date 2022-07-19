import { Button, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { ActionsTypesFrom, DataGridPropsStyling, UserRoles } from "../../core/types";
import { Project } from "../../models/project/project-model";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useEffect, useState } from "react";
import { deleteProject, getProjects } from "../../services/project.api.service";
import { useDispatch } from "react-redux";
import React from "react";
import ConfirmationDialog from "../../components/confirmation-dialog/confirmation-dialog";
import store from "../../store/store";
import { setFormProjectOpen } from "../../store/project-slices/form-project-opened-slice";
import { setCurrentlyProjectAction } from "../../store/project-slices/currently-action-slice";
import { setCurrentlyProjectRow } from "../../store/project-slices/currently-row-slice";

export function Projects() {
    const [ownerHide, setOwnerHide] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = store.getState();
   
    const columns: GridColDef[] = [
        {field: 'userName', headerName: 'Proiectant', flex: 0, hide: ownerHide, width: 150,
            valueGetter: (params: GridValueGetterParams) => `${params.row.userName.lastName} ${params.row.userName.firstName}`
        },
        {field: 'name', headerName: 'Nume', flex: 0},
        {field: 'buildingTypeName', headerName: 'Tip Clădire',flex: 0, width: 150},
        {field: 'width', headerName: 'Lățime', flex: 0, width: 120,
            valueGetter: (params: GridValueGetterParams) => `${params.row.width} mm`
        },
        {field: 'height', headerName: 'Înălțime', flex: 0, width: 120,
            valueGetter: (params: GridValueGetterParams) => `${params.row.height} mm`
        },
        {field: 'length', headerName: 'Adâncime', flex: 0, width: 120,
            valueGetter: (params: GridValueGetterParams) => `${params.row.length} mm`
        },
        {field: 'buildingMaterialsNames', headerName: 'Materiale', flex: 0, width: 150,
            renderCell: (params: GridValueGetterParams) => {
                let tooltipContent = "";
                params.row.buildingMaterialsNames.map((name:string)=>tooltipContent += name + ", ")
                tooltipContent = tooltipContent.slice(0, -2);
                return (
                    <Tooltip title={tooltipContent} arrow placement="right">
                        <Button>
                            <span style={{marginRight: "3px"}}>
                                {params.row.buildingMaterialsNames.length == 1? 
                                    params.row.buildingMaterialsNames.length + ' Material '
                                    : params.row.buildingMaterialsNames.length + ' Materiale '
                                }</span>
                            <ReadMoreIcon/>
                        </Button>
                    </Tooltip>
                );
            }
        },
        {field: 'hasUndergroundFloors', headerName: 'Subteran', type: 'boolean', flex: 0, width: 120},
        {field: 'hasElevator', headerName: 'Lift', type: 'boolean', flex: 0, width: 120},
        {field: 'technicalLeadDensity', headerName: 'Densitatea plumbului', flex: 1, align: "center"},
        {field: 'isDraft', headerName: 'Draft', type: 'boolean', flex: 0},
        {
            field: 'actions',
            type: 'actions',
            width: 120,
            renderCell: (params: GridRenderCellParams<Project>) => {
                return (
                    <>
                        <Tooltip title="Vizualizează">
                            <GridActionsCellItem 
                                icon={<VisibilityOutlinedIcon />} 
                                style={{color:"blue", marginRight: "5px"}} 
                                label="View"
                                onClick={()=>handleClickOpenViewPage(params.row)}
                            />
                        </Tooltip>
                        
                        <Tooltip title="Editează">
                            <GridActionsCellItem 
                                icon={<EditIcon />} 
                                style={{marginRight: "5px"}} label="Edit" 
                                onClick={()=>handleClickOpenEditForm(params.row)}
                            />
                        </Tooltip>

                        <Tooltip title="Șterge">
                            <GridActionsCellItem 
                                icon={<DeleteIcon />} 
                                style={{color:"red"}} 
                                label="Delete"
                                onClick={()=>handleClickOpenDeleteConfirmationDialog(params.row)}
                            />
                        </Tooltip>
                    </>
                )
            }
        },
    ]

    const [projects, setProjects] = useState<Project[]>([]);
    
    function checkRole() {
        if(state.user.role!= UserRoles.Administrator)
    {
        setOwnerHide(true);
    }
      };
    function getAndSetProjects() {
        getProjects().then((p) => {
            setProjects(p);
        });
    }
  
    useEffect(() => {
        checkRole();
        getAndSetProjects();
    }, []);

    const defaultSelectedRow = {
        id: 0,
        buildingTypeId: 0,
        buildingMaterialsIds: [],
        name:"",
        height: 0,
        width: 0,
        length: 0,
        hasUndergroundFloors:false,
        hasElevator:false,
        technicalLeadDensity:0,
        isDraft:false,
        buildingMaterialsNames:[],
        buildingTypeName: ""
    }

    function handleClickOpenAddForm(){
        dispatch(setCurrentlyProjectRow({row: defaultSelectedRow}));
        dispatch(setCurrentlyProjectAction({actionType: ActionsTypesFrom.Add}))
        dispatch(setFormProjectOpen({isOpen: true}))
        navigate("/proiecte/formular");
    }

    function handleClickOpenEditForm(girdRow:Project){
        dispatch(setCurrentlyProjectRow({row: girdRow}));
        dispatch(setCurrentlyProjectAction({actionType: ActionsTypesFrom.Edit}))
        dispatch(setFormProjectOpen({isOpen: true}))
        navigate("/proiecte/formular");
    }
    
    const [openConfirmDialog, setOpenConfirmationDialog] = React.useState(false);
    
    const handleClickOpenDeleteConfirmationDialog = function (gridRow: Project) {
        setOpenConfirmationDialog(true);
        dispatch(setCurrentlyProjectRow({row: gridRow}));
    };

    function handleClickOpenViewPage(girdRow:Project){
        dispatch(setCurrentlyProjectRow({row: girdRow}));
        dispatch(setFormProjectOpen({isOpen: true}))
        navigate("/proiecte/vizualizareProiect");
    }

    const deleteEntity = () => {
        deleteProject(store.getState().currentlyProjectRow.row.id)
          .then(() => getAndSetProjects());
        setOpenConfirmationDialog(false);
    };

    return ( 
    <div className="container">
        <Typography id="nomenclature-title" variant="h2" gutterBottom component="div">Proiecte</Typography>
      
        <hr style={{margin: "0 40px 0 40px"}}/>

        <div id="container-back-and-add-buttons" style={{justifyContent: "end"}}>
            <Button variant="outlined" onClick={handleClickOpenAddForm} >Adaugă</Button>
        </div>

        <div id="container-data-grid">
        <DataGrid
            rows={projects}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            sx = {DataGridPropsStyling}
        />

        {openConfirmDialog ? (
          <ConfirmationDialog
            elementName={store.getState().currentlyProjectRow.row.name}
            nomenclatoreName={"Proiecte"}
            onConfirmDelete={deleteEntity}
            openConfirmDialog={openConfirmDialog}
            setOpenConfirmationDialog={setOpenConfirmationDialog}
          />
        ) : null}
      </div>

    </div> 
    );
}
