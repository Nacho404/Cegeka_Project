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
import { BuildingElement } from "../../../models/nomenclators/building-element.model";
import { getBuildingElements } from "../../../services/building.element.api.service";

interface TProps {
  formik: any;
  currentBuildingElementTypeId: number;
}

export default function BuildingElementSelectList(props: TProps) {
  const [buildingElements, setBuildingElements] = useState<BuildingElement[]>([]);

  useEffect(() => {
    getBuildingElements().then((be) => {
      setBuildingElements(be);
    });
  }, []);

  const [buildingElementTypeId, setElementId] = React.useState(props.currentBuildingElementTypeId);

  return (
    <FormControl fullWidth style={{ marginTop: "30px", marginBottom: "15px", maxWidth: 500}} variant="standard"
      error={props.formik.touched.elementId && Boolean(props.formik.errors.elementId)}
    >
      <InputLabel id="demo-customized-select-label">Selecteaza elementul de construcție</InputLabel>
      <Select
        labelId="demo-customized-select-label"
        id="demo-simple-select"
        label="Element"
        name="buildingElementTypeId"
        value={buildingElementTypeId}
        onChange={(e) => { props.formik.handleChange(e); setElementId(+e.target.value); }}
      >
        {buildingElements.map((e) => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
      </Select>
      <FormHelperText>{props.formik.touched.elementId && props.formik.errors.elementId}</FormHelperText>
    </FormControl>
  );
}


