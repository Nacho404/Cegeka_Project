import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import { PersonPinSharp } from '@mui/icons-material';

interface TProps {
  elementName:string;
  nomenclatoreName: string;
  onConfirmDelete: any;
  openConfirmDialog:any;
  setOpenConfirmationDialog:any;
}

export default function ConfirmationDialog(props: TProps) {
  return (
    <div>
      <Dialog
        open={props.openConfirmDialog}
        onClose={() => props.setOpenConfirmationDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{display: "flex", alignItems: "center", color:'red'}}>
            {<GppMaybeOutlinedIcon fontSize="large" />}
            {"Stergere element"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Sunteti sigur ca doriti sa stergeti elementul <strong>{props.elementName}</strong> din <strong>{props.nomenclatoreName}</strong>?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button id="confirmation-button-yes" onClick={props.onConfirmDelete}>Da</Button>
            <Button id="confirmation-button-no" onClick={() => props.setOpenConfirmationDialog(false)} autoFocus>Nu</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}