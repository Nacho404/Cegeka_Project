import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { BuildingMaterial } from "../../models/nomenclators/building-material.model";
import { getBuildingMaterials } from "../../services/building.materials.api.service";

interface TProps {
    formik: any;
    currentlyRowSelected: any;
}
export default function BuildingMaterialsMultiSelect(props: TProps){

    const [buildingMaterials, setBuildingMaterials] = useState<BuildingMaterial[]>([]);

    useEffect(() => {
        getBuildingMaterials().then((bm) => {
        setBuildingMaterials(bm);
        });
    }, []);

    const [buildingMaterialsNames, setBuildingMaterialsNames] = React.useState<string[]>(
        props.currentlyRowSelected.buildingMaterialsNames
    );

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },};

    const theme = useTheme();
    function getStyles(buildingMaterialsName: string, buildingMaterialsNames: readonly string[], theme: Theme) {
        return {
          fontWeight:
            buildingMaterialsNames.indexOf(buildingMaterialsName) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
    }
    
    const handleChangeMultiSelect = (event: SelectChangeEvent<typeof buildingMaterialsNames>) => {
        const { target: { value },} = event;

        setBuildingMaterialsNames(
            typeof value === 'string' ? value.split(',') : value,
        );
        
        const newBuildingMaterialsIds:number[] = [];

        for(let i=0; i<value.length;i++){
            buildingMaterials.map((bm)=> {
                if(bm.name === value[i]) newBuildingMaterialsIds.push(bm.id);
            });
        }

        props.formik.initialValues.buildingMaterialsIds = newBuildingMaterialsIds;
        props.formik.values.buildingMaterialsIds = newBuildingMaterialsIds;
    };

    return (
        <FormControl 
            sx={{ m: 1, width: 500, mt: 10 }}
            error={props.formik.touched.buildingMaterialsIds && Boolean(props.formik.errors.buildingMaterialsIds)}
        >
            <InputLabel id="demo-multiple-chip-label">Materiale</InputLabel>

            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                name="buildingMaterialsIds"
                value={buildingMaterialsNames}
                onChange={handleChangeMultiSelect}
                input={<OutlinedInput id="select-multiple-chip" label="Materiale" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                >
                {buildingMaterials.map((bm) => (
                    <MenuItem
                        key={bm.id}
                        value={bm.name}
                        style={getStyles(bm.name, buildingMaterialsNames, theme)}
                    >
                        {bm.name}
                    </MenuItem>
                ))}
            </Select>

            <FormHelperText>
                {props.formik.touched.buildingMaterialsIds && props.formik.errors.buildingMaterialsIds}
            </FormHelperText>
        </FormControl>
    )
}