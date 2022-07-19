import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { BuildingType } from "../../models/nomenclators/building-type.model";
import { getBuildingTypes } from "../../services/building.types.api.service";

interface TProps {
    formik: any;
    currentBuildingTypeId: string;
}

export default function BuildingTypesSelect(props: TProps){

    const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>([]);

    useEffect(() => {
        getBuildingTypes().then((bt) => {
            setBuildingTypes(bt);
        });
    }, []);

    const [buildingTypeId, setBuildingTypeId] = React.useState(props.currentBuildingTypeId);
    return (
        <FormControl
            fullWidth 
            style={{width: 500, marginTop: "20px"}} 
            variant="standard"
            error={props.formik.touched.buildingTypeId && Boolean(props.formik.errors.buildingTypeId)}
        >
            <InputLabel variant="standard" htmlFor="uncontrolled-native" id="demo-customized-select-label">
                Selecteaza tipul de cladire
            </InputLabel>

            <Select
                style={{maxWidth: 500}}
                labelId="demo-customized-select-label"
                id="demo-simple-select"
                label="Tip cladire"
                name="buildingTypeId"
                value={buildingTypeId}
                onChange={(e) => { props.formik.handleChange(e); setBuildingTypeId(e.target.value); }}
            >
                {buildingTypes.map((bt) => <MenuItem key={bt.id} value={bt.id}>{bt.name}</MenuItem>)}
            </Select>

            <FormHelperText>{props.formik.touched.buildingTypeId && props.formik.errors.buildingTypeId}</FormHelperText>

        </FormControl>
    )
}