import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import ConfirmationDialog from "../../../components/confirmation-dialog/confirmation-dialog";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import Form from "./form";
import { useNavigate } from "react-router-dom";
import { ActionsTypesFrom, DataGridPropsStyling } from "../../../core/types";
import { FireResistanceTimeRowModel } from "./row-model";
import { EmptyObject } from "react-hook-form";
import {
  deleteFireResistanceTime,
  getFireResistanceTime,
} from "../../../services/fire.resistance.time.api.service";
import { FireResistanceTime } from "../../../models/nomenclators/fire-resistance-time.model";

export function FireResistanceTimes() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100, hideable: true },
    { field: "time", headerName: "Timp", width: 300 },
    {
      field: "buildingElementName",
      headerName: "Element de construcție",
      width: 300,
      flex: 6,
    },
    {
      field: "resistanceDegree",
      headerName: "Grad rezistență la foc",
      width: 300,
      flex: 6,
    },
    {
      field: 'editeaza', headerName: "Editeaza", type: "actions", headerAlign: 'center', sortable: false, width: 200, align: 'center',
      renderCell: (params: GridRenderCellParams<FireResistanceTime>) => {
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
      },
    },
    {
      field: 'sterge', headerName: "Șterge", type: "actions", headerAlign: 'center', sortable: false, width: 200, align: 'center',
      renderCell: (params: GridRenderCellParams<FireResistanceTime>) => {
        return (
          <>
            <Button
              variant="outlined"
              onClick={() => handleClickOpenDeleteConfirmationDialog(params.row)}
              style={{ color: "red", borderColor: "red" }}
            >
              Șterge
            </Button>
          </>
        );
      },
    },
  ];

  const [fireResistanceTimes, setFireResistanceTimes] = useState<
    FireResistanceTime[]
  >([]);

  function getAndSetFireResistanceTimes() {
    getFireResistanceTime().then((bt) => {
      setFireResistanceTimes(bt);
    });
  }

  useEffect(() => {
    getAndSetFireResistanceTimes();
  }, []);

  const navigate = useNavigate();
  const [currentlySelectedRow, setCurrentlySelectedRow] = React.useState<
    FireResistanceTimeRowModel
  >({
    id:0,buildingElementTypeId:0,fireResistanceDegreeId:0,time:0,buildingElementName:"",resistanceDegree:""
  });
  const [openConfirmDialog, setOpenConfirmationDialog] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [action, setAction] = React.useState("");

  const handleClickOpenDeleteConfirmationDialog = function (row: FireResistanceTimeRowModel) {
    setOpenConfirmationDialog(true);
    setCurrentlySelectedRow(row);
  };

  const handleClickOpenEditForm = (row: FireResistanceTimeRowModel) => {
    setOpenForm(true);
    setCurrentlySelectedRow(row);
    setDialogTitle("Modifică timpul de rezistență la foc");
    setAction(ActionsTypesFrom.Edit);
  };

  const handleClickOpenAddForm = () => {
    setOpenForm(true);
    setCurrentlySelectedRow({id:0,buildingElementTypeId:0,fireResistanceDegreeId:0,time:0,buildingElementName:"",resistanceDegree:""});
    setDialogTitle("Adăugați timpul de rezistență la foc");
    setAction(ActionsTypesFrom.Add);
  };

  const deleteEntity = () => {
    deleteFireResistanceTime(currentlySelectedRow.id).then(() =>
      getAndSetFireResistanceTimes()
    );
    setOpenConfirmationDialog(false);
  };

  function renderRows() {
    const totalRows: any = [];
    fireResistanceTimes.map((m) =>
      totalRows.push({
        id: m.id,
        buildingElementTypeId: m.buildingElementTypeId,
        fireResistanceDegreeId: m.fireResistanceDegreeId,
        buildingElementName: m.buildingElementsType.name,
        resistanceDegree: m.fireResistanceDegree.name,
        time: m.time,
      })
    );
    return totalRows;
  }
  return (
    <div className="container">
      <Typography
        id="nomenclature-title"
        variant="h2"
        gutterBottom
        component="div"
      >
        Timp rezistență la foc
      </Typography>

      <hr style={{ margin: "0 40px 0 40px" }} />

      <div id="container-back-and-add-buttons">
        <Button onClick={() => navigate("/nomenclatoare")} variant="contained">
          Înapoi la Nomenclatoare Conexe
        </Button>
        <Button variant="outlined" onClick={handleClickOpenAddForm}>Adaugă</Button>
      </div>
      <div id="container-data-grid">
        <DataGrid
          rows={renderRows()}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          sx={DataGridPropsStyling}
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
            getAndSetFireResistanceTimes={getAndSetFireResistanceTimes}
          />
        ) : null}

        {openConfirmDialog ? (
          <ConfirmationDialog
            elementName={currentlySelectedRow.id.toString()}
            nomenclatoreName={"Timp rezistență la foc"}
            onConfirmDelete={deleteEntity}
            openConfirmDialog={openConfirmDialog}
            setOpenConfirmationDialog={setOpenConfirmationDialog}
          />
        ) : null}
      </div>
    </div>
  );
}
