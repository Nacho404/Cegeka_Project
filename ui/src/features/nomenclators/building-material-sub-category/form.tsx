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
import { MaterialSubcategory } from "../../../models/nomenclators/building-material-subcategory.model";
import {
  insertBuildingMaterialSubcategory,
  updateBuildingMaterialSubcategory
} from "../../../services/building.materials.subcategory.api.service";
import CloseIcon from '@mui/icons-material/Close';
import CategoriesSelectList from "./categories-select-list";
import { ActionsTypesFrom } from "../../../core/types";

interface TProps {
  element: MaterialSubcategory;
  dialogTitle: string;
  action: string;
  openForm: any;
  setOpenForm: any;
  getAndSetMaterialsSubcategories: any;
}

const validationSchema = yup.object({
  name: yup.string().required("Acest camp este obligatoriu!"),
  categoryId: yup.string().required("Acest camp este obligatoriu!")
});

function reloadPage(props:TProps, resetForm:any) : void {
  resetForm();
  props.setOpenForm(false);
  props.getAndSetMaterialsSubcategories();
}

export default function Form(props: TProps) {
  const formik = useFormik({
    initialValues: {
      name: props.element.name,
      categoryId: props.element.categoryId
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const editEntity = () => {
        const materialSubcategory: MaterialSubcategory = {
          id: props.element.id,
          name: values.name,
          categoryId: values.categoryId
        };
        updateBuildingMaterialSubcategory(materialSubcategory, props.element.id)
        .then(() => {
          reloadPage(props, resetForm);
        });
      }

      const addEntity = () => {
        const materialSubcategory = {
          name: values.name,
          categoryId: values.categoryId
        }
        insertBuildingMaterialSubcategory(materialSubcategory)
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
      open={props.openForm}
      onClose={() => props.setOpenForm(false)}
    >
      <DialogTitle style={{width: 450, wordWrap: "break-word"}}>{props.dialogTitle}</DialogTitle>
      <DialogContent style={{padding: "0 24px 0 24px"}}>
        <form onSubmit={formik.handleSubmit} style={{maxWidth: 500}}>
          <TextField
            style={{ width: 500, marginTop: "20px" }}
            id="name"
            name="name"
            label="Nume"
            placeholder={props.element.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}>
            </TextField>

          <CategoriesSelectList formik={formik} currentCategoryId={formik.values.categoryId} />

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