import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MaterialsCategory } from "../../../models/nomenclators/building-material-category.model";
import { getMaterialsCategories } from "../../../services/building.materials.category.api.service";

interface TProps {
  formik: any;
  currentCategoryId: number;
}


export default function CategoriesSelectList(props: TProps) {
  const [materialCategories, setMaterialsCategories] = useState<MaterialsCategory[]>([]);

  useEffect(() => {
    getMaterialsCategories().then((bt) => {
      setMaterialsCategories(bt);
    });
  }, []);

  const [categoryId, setCategoryId] = React.useState(props.currentCategoryId);

  return (
    <FormControl fullWidth style={{maxWidth: 500, marginTop: "30px"}} variant="standard"
      error={props.formik.touched.categoryId && Boolean(props.formik.errors.categoryId)}
    >
      <InputLabel variant="standard" htmlFor="uncontrolled-native" id="demo-customized-select-label">Selecteaza categoria</InputLabel>
      <Select
        style={{maxWidth: 500}}
        labelId="demo-customized-select-label"
        id="demo-simple-select"
        label="Categorie"
        name="categoryId"
        value={categoryId}
        onChange={(e) => { props.formik.handleChange(e); setCategoryId(+e.target.value); }}
      >
        {materialCategories.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
      </Select>
      <FormHelperText>{props.formik.touched.categoryId && props.formik.errors.categoryId}</FormHelperText>
    </FormControl>
  );
}


