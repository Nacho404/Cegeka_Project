import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CloseIcon from '@mui/icons-material/Close';
import { ActionsTypesFrom } from "../../../core/types";
import { BuildingType } from "../../../models/nomenclators/building-type.model";
import {
  insertBuildingType,
  updateBuildingType
} from "../../../services/building.types.api.service";
import { AxiosResponse } from "axios";
import React from "react";
import { BuildingTypes } from ".";

interface TProps {
  element: BuildingType;
  dialogTitle: string;
  action: string;
  openForm: any;
  setOpenForm: any;
  getAndSetBuildingType: any;
}

const validationSchema = yup.object({
  name: yup.string().required("Acest camp este obligatoriu!"),
});

function reloadPage(props:TProps, resetForm:any) : void {
  resetForm();
  props.setOpenForm(false);
  props.getAndSetBuildingType();
}


export default function Form(props: TProps) {

  const addEntity = (values: BuildingType, resetForm:any) => {
    const buildingType = {
      name: values.name,
    }
    insertBuildingType(buildingType)
    .then(() => { 
      reloadPage(props, resetForm);
    });
  }

  const editEntity = (values: BuildingType, resetForm:any) => {
    const buildingType: BuildingType = {
      id: props.element.id,
      name: values.name
    };
    updateBuildingType(buildingType, props.element.id)
    .then(() => {
      reloadPage(props, resetForm);
    });
  }

  const formik = useFormik({
    initialValues: {
      name: props.element.name,
      id: props.element.id,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (props.action == ActionsTypesFrom.Add) addEntity(values, resetForm);
      if (props.action == ActionsTypesFrom.Edit) editEntity(values, resetForm);
    }
  });

  return (
    <Dialog
      open={props.openForm}
      onClose={() => props.setOpenForm(false)}
    >
      <DialogTitle>{props.dialogTitle}</DialogTitle>
      <DialogContent style={{padding: "0 24px 0 24px"}}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            style={{ width: 500, marginTop: "20px" }}
            id="name"
            name="name"
            label="Nume"
            placeholder={props.element.name} //replace
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <div id="form-buttons">
            <Button className="button-formular-style" type="submit">{props.action}</Button>
            <Button className="button-formular-style" onClick={() => props.setOpenForm(false)}>RENUNȚĂ</Button>
          </div>
          
        </form>
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenForm(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}>
          <CloseIcon style={{color: "#1976d2"}} />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}