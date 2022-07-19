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
import { FireResistanceDegree } from "../../../models/nomenclators/fire-resistance-degree.model";
import { FireResistanceTime } from "../../../models/nomenclators/fire-resistance-time.model";
import { getFireResistanceDegree, getFireResistanceTime } from "../../../services/fire.resistance.time.api.service";
  
  interface TProps {
    formik: any;
    currentFireFireResistanceDegreeId: number;
  }
  
  export default function FireResistanceDegreeSelectList(props: TProps) {
    const [fireResistanceDegrees, setFireResistanceDegrees] = useState<FireResistanceDegree[]>([]);
  
    useEffect(() => {
      getFireResistanceDegree().then((frt) => {
        setFireResistanceDegrees(frt);
      });
    }, []);
  
    const [degreeId, setDegreeId] = React.useState(props.currentFireFireResistanceDegreeId);
  
    return (
      <FormControl fullWidth style={{ marginTop: "30px", marginBottom: "15px", maxWidth: 500}} variant="standard"
        error={props.formik.touched.degreeId && Boolean(props.formik.errors.degreeId)}
      >
        <InputLabel id="demo-customized-select-label">Selecteaza gradul de rezistență</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-simple-select"
          label="Grad Rezistență"
          name="fireResistanceDegreeId"
          value={degreeId}
          onChange={(e) => { 
            props.formik.handleChange(e); setDegreeId(+e.target.value); }}
        >
          {fireResistanceDegrees.map((e) => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
        </Select>
        <FormHelperText>{props.formik.touched.degreeId && props.formik.errors.degreeId}</FormHelperText>
      </FormControl>
    );
  }
  
  
  