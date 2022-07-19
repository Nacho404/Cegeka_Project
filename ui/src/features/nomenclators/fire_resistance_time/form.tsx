import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { ActionsTypesFrom } from "../../../core/types";
import { FireResistanceTime } from "../../../models/nomenclators/fire-resistance-time.model";
import {
  insertFireResistanceTime,
  updateFireResistanceTime,
} from "../../../services/fire.resistance.time.api.service";
import BuildingElementSelectList from "./building-element-list";
import FireResistanceDegreeSelectList from "./fire-resistance-degree-list";
import { FireResistanceTimeRowModel } from "./row-model";

interface TProps {
  element: FireResistanceTimeRowModel;
  dialogTitle: string;
  action: string;
  openForm: any;
  setOpenForm: any;
  getAndSetFireResistanceTimes: any;
}
const validationSchema = yup.object({
  time: yup.string().required("Acest camp este obligatoriu!"),
  buildingElementTypeId: yup.string().required("Acest camp este obligatoriu!"),
  fireResistanceDegreeId: yup.string().required("Acest camp este obligatoriu!"),
});

function reloadPage(props: TProps, resetForm: any): void {
  resetForm();
  props.setOpenForm(false);
  props.getAndSetFireResistanceTimes();
}

export default function Form(props: TProps) {
  const formik = useFormik({
    initialValues: {
      time: props.element.time,
      buildingElementTypeId:props.element.buildingElementTypeId,
      fireResistanceDegreeId:props.element.fireResistanceDegreeId,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const editEntity = () => {
        const fireResistanceTime: FireResistanceTime = {
          id: props.element.id,
          time: values.time,
          buildingElementTypeId: values.buildingElementTypeId,
          fireResistanceDegreeId: values.fireResistanceDegreeId,
        };
        updateFireResistanceTime(fireResistanceTime, props.element.id).then(
          () => {
            reloadPage(props, resetForm);
          }
        );
      };
      const addEntity = () => {
        const fireResistanceTime = {
          time: values.time,
          buildingElementTypeId: values.buildingElementTypeId,
          fireResistanceDegreeId: values.fireResistanceDegreeId,
        };
        insertFireResistanceTime(fireResistanceTime).then(() => {
          reloadPage(props, resetForm);
        });
      };
      if (props.action == ActionsTypesFrom.Edit) editEntity();
      if (props.action == ActionsTypesFrom.Add) addEntity();
    },
  });
  return (
    <Dialog
      PaperProps={{ sx: { width: "37%" } }}
      open={props.openForm}
      onClose={() => props.setOpenForm(false)}
    >
      <DialogTitle>{props.dialogTitle}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            style={{ width: 500, marginTop: "20px" }}
            id="time"
            name="time"
            label="Timp"
            type="number"
            value={formik.values.time}
            onChange={formik.handleChange}
            error={formik.touched.time && Boolean(formik.errors.time)}
            helperText={formik.touched.time && formik.errors.time}
          ></TextField>
          <BuildingElementSelectList
            formik={formik}
            currentBuildingElementTypeId={props.element.buildingElementTypeId}
          />
          <FireResistanceDegreeSelectList
            formik={formik}
            currentFireFireResistanceDegreeId={props.element.fireResistanceDegreeId}
          />
          <div id="form-buttons">
            <Button className="button-formular-style" type="submit">{props.action}</Button>
            <Button className="button-formular-style"  onClick={() => props.setOpenForm(false)}>RENUNTA</Button>
          </div>
        </form>
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenForm(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon style={{color: "#1976d2"}} />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}
