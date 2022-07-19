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
import { BuildingMaterial } from "../../../models/nomenclators/building-material.model";
import CloseIcon from '@mui/icons-material/Close';
import { ActionsTypesFrom } from "../../../core/types";
import SubcategoriesSelectList from "./subcategories-select-list";
import {
  insertBuildingMaterials,
  updateBuildingMaterials
} from "../../../services/building.materials.api.service";

interface TProps {
  element: any;
  dialogTitle: string;
  action: string;
  openForm: any;
  setOpenForm: any;
  getAndSetBuildingMaterials: any;
}

const validationSchema = yup.object({
  name: yup.string().required("Acest camp este obligatoriu"),
  hui: yup.string().required("Acest camp este obligatoriu"),
  subcategoryId: yup.string().required("Acest camp este obligatoriu")
});

function reloadPage(props:TProps, resetForm:any) : void {
  resetForm();
  props.setOpenForm(false);
  props.getAndSetBuildingMaterials();
}

export default function Form(props: TProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      hui: "",
      subcategoryId: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const editEntity = () => {
        const buildingMaterial: BuildingMaterial = {
          id: props.element.id,
          name: values.name,
          hui: parseFloat(values.hui),
          subcategoryId: parseInt(values.subcategoryId, 10)
        };
        updateBuildingMaterials(buildingMaterial, props.element.id)
        .then(() => {
          reloadPage(props, resetForm);
        });
      }
      const addEntity = () => {
        const buildingMaterial = {
          name: values.name,
          hui: parseFloat(values.hui),
          subcategoryId: parseInt(values.subcategoryId, 10)
        }
        insertBuildingMaterials(buildingMaterial)
        .then(() => {
          reloadPage(props, resetForm);
        });
      }
      if (props.action == ActionsTypesFrom.Edit) editEntity();
      if (props.action == ActionsTypesFrom.Add) addEntity();
    }
  });
  return (
    <Dialog
      PaperProps={{ sx: { width: "40%" } }}
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
            placeholder={props.element.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          ></TextField>
          <TextField
            style={{ width: 500, marginTop: "20px" }}
            id="hui"
            name="hui"
            label="HUI"
            placeholder={props.element.hui}
            value={formik.values.hui}
            onChange={formik.handleChange}
            error={formik.touched.hui && Boolean(formik.errors.hui)}
            helperText={formik.touched.hui && formik.errors.hui}
          ></TextField>
          <SubcategoriesSelectList formik={formik} currentSubcategory={props.element.subcategoryName} />

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