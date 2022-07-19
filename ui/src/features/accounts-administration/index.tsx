import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import * as React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    GridColDef,
    GridRenderCellParams,
    DataGrid,
    GridValueGetterParams
} from "@mui/x-data-grid";
import { DataGridPropsStyling } from "../../core/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Account } from "../../models/administration-account/account";
import { deleteAccount, getAccounts } from "../../services/administration.account.api.service";
import EditAccountForm from "./edit-account-form";
import { AddAccountForm } from "./add-account-form";
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';



export function Accounts() {

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {field: 'lastName', headerName: 'Nume', flex: 1},
    { field: 'firstName', headerName: 'Prenume', flex: 1},
    { field: 'email', headerName: 'E-mail', flex: 1},
    { field: 'fullName', headerName: 'Nume complet', flex: 1,
      valueGetter: (params: GridValueGetterParams) => `${params.row.lastName} ${params.row.firstName}`
    },
    { field: 'currentlyRoleName', headerName: 'Rol', flex: 2},
    {
      field: 'editeaza', headerName: "Editează", type: "actions", headerAlign: 'center', sortable: false, width: 200, align: 'center',
      renderCell: (params: GridRenderCellParams<Account>) => {
        return (
          <>
            <Button
              variant="outlined"
              onClick={()=>handleClickOpenEditForm(params.row)}
              style={{color:"orange", borderColor: "orange"}}>
              Editează
            </Button>
          </>
        );
      }
    },
    {
      field: 'sterge', headerName: "Șterge", type: "actions", headerAlign: 'center', sortable: false, width: 200, align: 'center',
      renderCell: (params: GridRenderCellParams<Account>) => {
        return (
          <>
            <Button
              variant="outlined"
              style={{color:"red", borderColor: "red"}}
              onClick= { () => handleClickOpenDeleteAccountDialog(params.row)}
              >
              Șterge
            </Button>
          </>
        );
      }
    },

  ]

  const defaultSelectedRow = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    roleId: "",
    currentlyRoleName: "",
    newRoleName: "",
    changePassword: true,
    password: ""
  }

  const [currentlySelectedRow, setCurrentlySelectedRow] = React.useState<Account>(defaultSelectedRow);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = React.useState(false);


  function getAndSetAccounts() {
    getAccounts().then((a) => {
      setAccounts(a);
      });
  }

  useEffect(() => {
    getAndSetAccounts();
  }, []);

  function handleClickOpenEditForm(gridRow:Account){
    setCurrentlySelectedRow(gridRow);
    setOpenEditForm(true);
  }
  
  function handleClickOpenAddForm(){
    setOpenAddForm(true);
  }

  function handleClickOpenDeleteAccountDialog(gridRow: Account){
    setCurrentlySelectedRow(gridRow);
    setOpenDeleteAccountDialog(true);
  }

  function handleClickDeleteAccount(){
    deleteAccount(currentlySelectedRow.id)
    .then(() => getAndSetAccounts());

    setOpenDeleteAccountDialog(false);
  }

  return (
    <div className="container">
      <Typography id="nomenclature-title" variant="h2" gutterBottom component="div">
        Administrare Conturi
        <ArrowForwardIosIcon
        fontSize="large"></ArrowForwardIosIcon>
        Utilizatori
      </Typography>

      <hr style={{margin: "0 40px 0 40px"}}/>

      <div id="container-back-and-add-buttons">
        <Button onClick={() => navigate("/nomenclatoare")} variant="contained">Înapoi la Nomenclatoare</Button>
        <Button variant="outlined" onClick={handleClickOpenAddForm}>Adaugă</Button>
      </div>


      <div id="container-data-grid">
        <DataGrid
          rows={accounts}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          sx = {DataGridPropsStyling}
        />
      </div>

      {openAddForm? 
        <AddAccountForm
          openAddForm = {openAddForm}
          setOpenAddForm = {setOpenAddForm}
          getAndSetAccounts = {getAndSetAccounts}
        />
      :null}

      {openEditForm ? (
        <EditAccountForm
          element={currentlySelectedRow}
          openEditForm={openEditForm}
          setOpenEditForm={setOpenEditForm}
          getAndSetAccounts={getAndSetAccounts} />
      ) : null}

        <Dialog
          open={openDeleteAccountDialog}
          onClose={() => setOpenDeleteAccountDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{display: "flex", alignItems: "center", color:'red'}}>
              {<GppMaybeOutlinedIcon fontSize="large" />}
              {"Stergere element"}
          </DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Sunteți sigur că doriți să ștergeți utilizatorul <strong>{currentlySelectedRow.lastName} {currentlySelectedRow.firstName}</strong> ?
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button id="confirmation-button-yes" onClick={handleClickDeleteAccount}>Da</Button>
              <Button id="confirmation-button-no" onClick={() => setOpenDeleteAccountDialog(false)} autoFocus>Nu</Button>
          </DialogActions>
        </Dialog>

    </div>
  );
}