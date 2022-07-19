import React, { useEffect, useState } from "react";
import {
  Button,
  Typography
} from "@mui/material";
import ConfirmationDialog from "../../../components/confirmation-dialog/confirmation-dialog";
import "react-toastify/dist/ReactToastify.css";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid';
import { MaterialSubcategory } from "../../../models/nomenclators/building-material-subcategory.model";
import {
  deleteBuildingMaterialSubcategory,
  getBuildingMaterialsSubcategories
} from "../../../services/building.materials.subcategory.api.service";
import Form from "./form";
import { useNavigate } from "react-router-dom";
import { ActionsTypesFrom, DataGridPropsStyling } from "../../../core/types";


export function MaterialsSubcategory() {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0},
    { field: 'name', headerName: 'Nume', flex: 1},
    { field: 'categoryName', headerName: 'Categorie', flex: 4, 
    valueGetter: (params: GridValueGetterParams) => `${params.row.buildingMaterialsCategory.name}`},
    {
      field: 'editeaza', headerName: "Editeaza", type: "actions", headerAlign: 'center', sortable: false, width: 200, align: 'center',
      renderCell: (params: GridRenderCellParams<MaterialSubcategory>) => {
        return (
          <>
            <Button 
            variant="outlined" 
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
      renderCell: (params: GridRenderCellParams<MaterialSubcategory>) => {
        return (
          <>
            <Button 
            variant="outlined" 
            onClick={() => handleClickOpenDeleteConfirmationDialog(params.row.buildingMaterialsCategory)}
            style={{color:"red", borderColor: "red"}}
            >
              Șterge
            </Button>
          </>
        );
      }
    },
  ]

  const [materialsSubcategories, setMaterialsSubcategories] = useState<MaterialSubcategory[]>([]);

  function getAndSetMaterialsSubcategories() {
    getBuildingMaterialsSubcategories().then((bt) => {
      setMaterialsSubcategories(bt);
    });
  }

  useEffect(() => {
    getAndSetMaterialsSubcategories();
  }, []);

  const navigate = useNavigate();
  const [currentlySelectedRow, setCurrentlySelectedRow] = React.useState<MaterialSubcategory>({ 
    id: 0,
    name: "",
    categoryId: 0,
    buildingMaterialsCategory: null});
  const [openConfirmDialog, setOpenConfirmationDialog] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [action, setAction] = React.useState("");


  const handleClickOpenDeleteConfirmationDialog = function (row: MaterialSubcategory) {
    setOpenConfirmationDialog(true);
    setCurrentlySelectedRow(row);
  };

  const handleClickOpenEditForm = (row: MaterialSubcategory) => {
    setOpenForm(true);
    setCurrentlySelectedRow(row);
    setDialogTitle("Modifică subcategoria materialului.");
    setAction(ActionsTypesFrom.Edit);
  };

  const handleClickOpenAddForm = () => {
    setOpenForm(true);
    setCurrentlySelectedRow({id: 0,
      name: "",
      categoryId: 0,
      buildingMaterialsCategory: null});
    setDialogTitle("Adăugați o subcategorie a materialului de construcție.");
    setAction(ActionsTypesFrom.Add);
  };

  const deleteEntity = () => {
    deleteBuildingMaterialSubcategory(currentlySelectedRow.id)
      .then(() => getAndSetMaterialsSubcategories());
    setOpenConfirmationDialog(false);
  };

  return (
    <div className="container">
      <Typography id="nomenclature-title" variant="h2" gutterBottom component="div">Subcategorii materiale de construcție</Typography>

      <hr style={{margin: "0 40px 0 40px"}}/>

      <div id="container-back-and-add-buttons">
        <Button onClick={() => navigate("/nomenclatoare")} variant="contained">Înapoi la Nomenclatoare Conexe</Button>
        <Button variant="outlined" onClick={handleClickOpenAddForm}>Adaugă</Button>
      </div>

      <div id="container-data-grid">
        <DataGrid
          rows={materialsSubcategories}
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
            element={currentlySelectedRow}
            dialogTitle={dialogTitle}
            action={action}
            openForm={openForm}
            setOpenForm={setOpenForm}
            getAndSetMaterialsSubcategories={getAndSetMaterialsSubcategories} />
        ) : null}

        {openConfirmDialog ? (
          <ConfirmationDialog
            elementName={currentlySelectedRow.name}
            nomenclatoreName={"Categorii de materiale de constructie"}
            onConfirmDelete={deleteEntity}
            openConfirmDialog={openConfirmDialog}
            setOpenConfirmationDialog={setOpenConfirmationDialog}
          />
        ) : null}
      </div>
    </div>
  );
}

