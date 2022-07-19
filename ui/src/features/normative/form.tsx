import CloseIcon from '@mui/icons-material/Close';
import * as yup from "yup";
import { NormativeElementDto } from "../../models/normative/normative-dto-model";
import { getNextChildTitle, insertNormativeElement, updateNormativeElement } from "../../services/normative.element.api";
import { useFormik } from "formik";
import { ActionsTypesFrom } from "../../core/types";
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Select, MenuItem } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BuildingType } from '../../models/nomenclators/building-type.model';
import { useEffect, useState } from 'react';
import { getBuildingTypes } from '../../services/building.types.api.service';

interface TProps {
  element: NormativeElementDto;
  dialogTitle: string;
  parentId: number;
  action: string;
  openForm: any;
  setOpenForm: any;
  getAndSetNormative: any;
}

const validationSchema = yup.object({
  title: yup.string().required("Acest camp este obligatoriu!"),
  content: yup.string(),
  buildingTypeId: yup.string().required("Acest camp este obligatoriu!"),
});

function reloadPage(props: TProps, resetForm: any): void {
  resetForm();
  props.setOpenForm(false);
  props.getAndSetNormative();
}

export default function Form(props: TProps) {

  const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>([]);

  useEffect(() => {
    getBuildingTypes().then((bt) => {
      setBuildingTypes(bt);
    });
    if (props.action == ActionsTypesFrom.Add) {
      getNextChildTitle(props.parentId).then(title => {
        formik.setFieldValue("title", title);
      });
    }
  }, []);

  const addEntity = (values: NormativeElementDto, resetForm: any) => {
    const normativeElement = {
      title: values.title,
      content: values.content,
      parentId: props.parentId,
      isActive: values.isActive,
      buildingTypeId: values.buildingTypeId
    }
    insertNormativeElement(normativeElement)
      .then(() => {
        reloadPage(props, resetForm);
      });
  }

  const editEntity = (values: NormativeElementDto, resetForm: any) => {
    const normativeElement: NormativeElementDto = {
      id: props.element.id,
      title: values.title,
      content: values.content,
      isActive: values.isActive,
      buildingTypeId: values.buildingTypeId
    };
    if (props.element.id) {
      updateNormativeElement(normativeElement, props.element.id)
        .then(() => {
          reloadPage(props, resetForm);
        });
    }
  }

  const formik = useFormik({
    initialValues: props.action == ActionsTypesFrom.Edit ? {
      id: props.element.id,
      title: props.element.title,
      content: props.element.content,
      isActive: props.element.isActive,
      buildingTypeId: props.element.buildingTypeId
    } : {
      title: '',
      content: '',
      isActive: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (props.action == ActionsTypesFrom.Add) addEntity(values, resetForm);
      if (props.action == ActionsTypesFrom.Edit) editEntity(values, resetForm);
    }
  });

  return (
    <Dialog
      PaperProps={{ sx: {} }}
      open={props.openForm}
      onClose={() => props.setOpenForm(false)}
    >
      <DialogTitle>{props.dialogTitle}</DialogTitle>
      <DialogContent style={{ padding: "0 24px 0 24px" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            style={{ width: 500, marginTop: "20px" }}
            id="title"
            name="title"
            label="Titlu"
            required
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <ReactQuill
            style={{ width: 500, marginTop: "20px" }}
            theme="snow"
            value={formik.values.content}
            onChange={(e: any) => {
              formik.setValues({ ...formik.values, content: e });
            }}
          />

          <Select
            style={{ maxWidth: 500, display: 'flex', marginTop: "20px" }}
            labelId="demo-customized-select-label"
            id="buildingTypeId"
            label="Tip cladire"
            name="buildingTypeId"
            value={formik.values.buildingTypeId}
            onChange={(e) => { formik.handleChange(e); }}
          >
            {buildingTypes.map((bt) => <MenuItem key={bt.id} value={bt.id}>{bt.name}</MenuItem>)}
          </Select>


          <div id="form-buttons">
            <Button id="form-button-submit" type="submit">{props.action}</Button>
            <Button id="form-button-cancel" onClick={() => props.setOpenForm(false)}>RENUNȚĂ</Button>
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
          <CloseIcon />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}