import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import ConfirmationDialog from "../../../components/confirmation-dialog/confirmation-dialog";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { BuildingElement } from "../../../models/nomenclators/building-element.model";
import {getBuildingElements, deleteBuildingElement} from "../../../services/building.element.api.service";
import Form from "./form";
import { useNavigate } from "react-router-dom";
import { ActionsTypesFrom, DataGridPropsStyling } from "../../../core/types";
import { RowModel } from "./row-model";

export function BuildingElements() {
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0 },
    {field: 'name', headerName: 'Nume', flex: 1},
    {
      field: 'editeaza', headerName: "Editeaza", type: "actions", headerAlign: 'center', sortable: false, width: 200, align: 'center',
      renderCell: (params : GridRenderCellParams<BuildingElement>) => {
        return (
          <>
            <Button 
              variant = "outlined"
              onClick={() => handleClickOpenEditForm(params.row)}
              style={{color:"orange", borderColor: "orange"}}
            >
              Editează
            </Button>
          </>
        );
      }
    },
    {
      field: 'sterge', headerName: "Sterge", type: "actions", headerAlign: 'center', sortable: false, width: 200, align: 'center',
      renderCell: (params : GridRenderCellParams<BuildingElement>) => {
        return (
          <>
            <Button 
              variant="outlined" 
              onClick={() => handleClickOpenDeleteConfirmationDialog(params.row)}
              style={{color:"red", borderColor: "red"}}
            >
              Șterge
            </Button>
          </>
        );
      }
    },
  ]

  const [buildingElements, setBuildingElements] = useState<BuildingElement[]>([]);

  function getAndSetBuildingElements(){
    getBuildingElements().then((bt) => {
      setBuildingElements(bt);
    });
  }

  useEffect(() => {
    getAndSetBuildingElements();
  }, []);

  const navigate = useNavigate();
  const [currentlySelectedRow, setCurrentlySelectedRow] = React.useState<BuildingElement>({ name: "", id: 0 });
  const [openConfirmDialog, setOpenConfirmationDialog] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [action, setAction] = React.useState("");

  const handleClickOpenDeleteConfirmationDialog = function (row: RowModel) {
    setOpenConfirmationDialog(true);
    setCurrentlySelectedRow(row);
  };


  const handleClickOpenAddForm = () => {
    setOpenForm(true);
    setCurrentlySelectedRow({ name: "", id: 0 });
    setDialogTitle("Adăugați un element de construcție.");
    setAction(ActionsTypesFrom.Add);
  };

  const handleClickOpenEditForm = (  row : BuildingElement) => {
    if (row) {
      setOpenForm(true);
      setCurrentlySelectedRow(row);
      setDialogTitle("Modifică elementul de construcție.");
      setAction(ActionsTypesFrom.Edit);
    }
  };

  const deleteEntity = () => { 
      deleteBuildingElement(currentlySelectedRow.id)
        .then(() => getAndSetBuildingElements());
      setOpenConfirmationDialog(false);
  };

  return (
    <div className="container">
      <Typography id="nomenclature-title" variant="h2" gutterBottom component="div">Elemente de construcție</Typography>
      
      <hr style={{margin: "0 40px 0 40px"}}/>

      <div id="container-back-and-add-buttons">
        <Button onClick={() => navigate("/nomenclatoare")} variant="contained">Înapoi la Nomenclatoare Conexe</Button>
        <Button variant="outlined" onClick={handleClickOpenAddForm}>Adaugă</Button>
      </div>
      
      <div id="container-data-grid">
        <DataGrid
        rows={buildingElements}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        sx = {DataGridPropsStyling}
        />
      </div>

      <div>
        {openForm ? (
          <Form 
            element = {currentlySelectedRow}
            dialogTitle= {dialogTitle}
            action = {action}
            openForm = {openForm} 
            setOpenForm = {setOpenForm}
            getAndSetBuildingElements = {getAndSetBuildingElements}/>
        ): null}
      
        {openConfirmDialog ? (
          <ConfirmationDialog
            elementName={currentlySelectedRow.name}
            nomenclatoreName={"Categorii de materiale de constructie"}
            onConfirmDelete={deleteEntity}
            openConfirmDialog = {openConfirmDialog}
            setOpenConfirmationDialog={setOpenConfirmationDialog}
          />
        ) : null}
      </div>

    </div>
  );
     
}