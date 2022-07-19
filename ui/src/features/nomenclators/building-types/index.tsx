import {
  Button,
  Typography
} from "@mui/material";
import {
  GridColDef,
  GridRenderCellParams,
  DataGrid
} from "@mui/x-data-grid";
import Form from "./form";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ActionsTypesFrom, DataGridPropsStyling } from "../../../core/types";
import { BuildingType } from "../../../models/nomenclators/building-type.model";
import ConfirmationDialog from "../../../components/confirmation-dialog/confirmation-dialog";
import "react-toastify/dist/ReactToastify.css";
import {
  getBuildingTypes,
  deleteBuildingType
} from "../../../services/building.types.api.service";
import { RowModel } from "./row-model";

export function BuildingTypes() {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0},
    { field: 'name', headerName: 'Nume', flex: 1},
    {
      field: 'editeaza', headerName: "Editează", type: "actions", headerAlign: 'center', sortable: false, width: 200, align: 'center',
      renderCell: (params: GridRenderCellParams<BuildingType>) => {
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
      field: 'sterge', headerName: "Șterge", type: "actions", headerAlign: 'center', sortable: false, width: 200, align: 'center',
      renderCell: (params: GridRenderCellParams<BuildingType>) => {
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

  const [buildingTypes, setBuildingType] = useState<BuildingType[]>([]);

  function getAndSetBuildingType() {
    getBuildingTypes().then((bt) => {
      setBuildingType(bt);
    });
  }

  useEffect(() => {
    getAndSetBuildingType();
  }, []);

  const navigate = useNavigate();
  const [currentlySelectedRow, setCurrentlySelectedRow] = React.useState<BuildingType>({ name: "", id: 0 });
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
    setDialogTitle("Adăugați un tip de material de construcție.");
    setAction(ActionsTypesFrom.Add);
  };

  const handleClickOpenEditForm = (row: BuildingType | undefined) => {
    if (row) {
      setOpenForm(true);
      setCurrentlySelectedRow(row);
      setDialogTitle("Modifică tipul materialului.");
      setAction(ActionsTypesFrom.Edit);
    }
  };

  const deleteEntity = () => {
    deleteBuildingType(currentlySelectedRow.id)
      .then(() => getAndSetBuildingType());
    setOpenConfirmationDialog(false);
  };

  function renderRows() {
    const totalRows: any = [];
    buildingTypes.map((m) => totalRows.push({ id: m.id, name: m.name }));
    return totalRows;
  }

  return (
    <div className="container">
      <Typography id="nomenclature-title" variant="h2" gutterBottom component="div">Tipuri de clădiri</Typography>

      <hr style={{margin: "0 40px 0 40px"}}/>

      <div id="container-back-and-add-buttons">
        <Button onClick={() => navigate("/nomenclatoare")} variant="contained">Înapoi la Nomenclatoare Conexe</Button>
        <Button variant="outlined" onClick={handleClickOpenAddForm}>Adaugă</Button>
      </div>

      <div id="container-data-grid">
        <DataGrid
          rows={renderRows()}
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
            getAndSetBuildingType={getAndSetBuildingType} />
        ) : null}

        {openConfirmDialog ? (
          <ConfirmationDialog
            elementName={currentlySelectedRow.name}
            nomenclatoreName={"Tipuri de materiale de constructie"}
            onConfirmDelete={deleteEntity}
            openConfirmDialog={openConfirmDialog}
            setOpenConfirmationDialog={setOpenConfirmationDialog}
          />
        ) : null}
      </div>
    </div>
  );
}
