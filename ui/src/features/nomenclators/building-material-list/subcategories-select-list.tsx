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
import { MaterialSubcategory } from "../../../models/nomenclators/building-material-subcategory.model";
import { getBuildingMaterialsSubcategories } from "../../../services/building.materials.subcategory.api.service";

interface TProps {
    formik: any;
    currentSubcategory: string;
}

export default function SubcategoriesSelectList(props: TProps) {
    const [materialSubcategories, setBuildingMaterialSubcategories] = useState<MaterialSubcategory[]>([]);

    useEffect(() => {
        getBuildingMaterialsSubcategories().then((bt) => {
            setBuildingMaterialSubcategories(bt);
        });
    }, []);

    const [subcategoryId, setSubcategoryId] = React.useState('');

    return (
        <FormControl fullWidth style={{ marginTop: "30px"}} variant="standard"
            error={props.formik.touched.subcategoryId && Boolean(props.formik.errors.subcategoryId)}
        >
            <InputLabel id="demo-customized-select-label">Selecteaza subcategoria</InputLabel>
            <Select
                style={{maxWidth: 500}}
                labelId="demo-customized-select-label"
                id="demo-simple-select"
                label="Subategorie"
                name="subcategoryId"
                value={subcategoryId}
                onChange={(e) => { props.formik.handleChange(e); setSubcategoryId(e.target.value); }}
            >
                {props.currentSubcategory ?
                    <MenuItem disabled style={{ color: "red" }}><strong>Actuala subcategorie: {props.currentSubcategory}</strong></MenuItem>
                    : null}
                {materialSubcategories.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </Select>
            <FormHelperText>{props.formik.touched.subcategoryId && props.formik.errors.subcategoryId}</FormHelperText>
        </FormControl>
    );
}


