import {
  Button,
  Typography
} from "@mui/material";
import {
  GridColDef,
  GridRenderCellParams,
  DataGrid
} from "@mui/x-data-grid";

import Form from "./form";
import React, { useState, useEffect } from "react";
import { EmptyObject } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../components/confirmation-dialog/confirmation-dialog";
import { ActionsTypesFrom, DataGridPropsStyling } from "../../../core/types";
import { BuildingMaterial } from "../../../models/nomenclators/building-material.model";
import {
  deleteBuildingMaterials,
  getBuildingMaterials,
  searchBuildingMaterials,
} from "../../../services/building.materials.api.service";
import SearchBar from "../../../components/search-bar";
import { RowModel } from "./row-model";

export function BuildingMaterials() {

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0, sortable: false },
    {
      field: "buildingMaterialsSubcategory",
      headerName: "Categorie",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {
              params.row.buildingMaterialsSubcategory.buildingMaterialsCategory.name
            }
          </div>
        );
      },
    },
    {
      field: "subcategoryName",
      headerName: "Subcategorie",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="rowitemm">
            {params.row.buildingMaterialsSubcategory.name}
          </div>
        );
      },
    },
    { field: "name", headerName: "Nume", flex: 1, sortable: false },
    { field: "hui", headerName: "HUI", flex: 1, sortable: false },

    {
      type: "actions",
      field: "sterge",
      headerName: "Șterge",
      flex: 1,
      headerAlign: 'center', sortable: false, width: 200, align: 'center',
      renderCell: (params: GridRenderCellParams<BuildingMaterial>) => {
        return (
          <>
            <Button
              variant="outlined"
              onClick={() => {
                openConfirmationDialog(params.row);
              }}
              style={{ color: "red", borderColor: "red" }}
            >
              Șterge
            </Button>
          </>
        );
      },
    },
  ];

  const [openConfirmDialog, setOpenConfirmationDialog] = React.useState(false);
  const [
    currentlySelectedBuildingMaterial,
    setCurrentlySelectedBuildingMaterial,
  ] = React.useState<BuildingMaterial | null>(null);

  const openConfirmationDialog = function (buildingMaterial: BuildingMaterial) {
    setOpenConfirmationDialog(true);
    setCurrentlySelectedBuildingMaterial(buildingMaterial);
  };
  const deleteEntity = () => {
    if (currentlySelectedBuildingMaterial) {
      deleteBuildingMaterials(currentlySelectedBuildingMaterial.id).then(() => {
        getAndSetBuildingMaterial();
      });
      setCurrentlySelectedBuildingMaterial(null);
    }
  };
  const [buildingMaterials, setBuildingMaterials] = useState<
    BuildingMaterial[]
  >([]);

  function getAndSetBuildingMaterial() {
    getBuildingMaterials().then((bt) => {
      setBuildingMaterials(bt);
    });
  }

  const findAndSetBuildingMaterial = (searchString: string) => {
    console.log(searchString)
    searchBuildingMaterials(searchString).then((bt) => {
      setBuildingMaterials(bt);
    });
  }
  useEffect(() => {
    getAndSetBuildingMaterial();
  }, []);

  let navigate = useNavigate();
  const [currentlySelectedRow, setCurrentlySelectedRow] = React.useState<RowModel | EmptyObject>({});
  const [openForm, setOpenForm] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [action, setAction] = React.useState("");

  const handleClickOpenAddForm = () => {
    setOpenForm(true);
    setCurrentlySelectedRow({});
    setDialogTitle("Adăugați un material de construcție.");
    setAction(ActionsTypesFrom.Add);
  };

  return (
    <div className="container">
      <Typography id="nomenclature-title" variant="h2" gutterBottom component="div">Materiale de construcție</Typography>

      <hr style={{ margin: "0 40px 0 40px" }} />

      <div id="container-back-and-add-buttons">
        <Button onClick={() => navigate("/nomenclatoare")} variant="contained">Înapoi la Nomenclatoare Conexe</Button>
        <div style={{ display: "flex", justifyContent: "space-between", width: 400 }}>
          <SearchBar onSearchSubmit={(searchString: string) => findAndSetBuildingMaterial(searchString)} />
          <Button variant="outlined" onClick={handleClickOpenAddForm}>Adaugă</Button>
        </div>
      </div>

      <div id="container-data-grid">
        <DataGrid
          rows={buildingMaterials}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          sx={DataGridPropsStyling}
        />
      </div>

      {currentlySelectedBuildingMaterial ? (
        <ConfirmationDialog
          elementName={currentlySelectedBuildingMaterial.name}
          nomenclatoreName={"Materiale de construcție"}
          onConfirmDelete={deleteEntity}
          openConfirmDialog={openConfirmDialog}
          setOpenConfirmationDialog={setOpenConfirmationDialog}
        />
      ) : null}

      <div>
        {openForm ? (
          <Form
            element={currentlySelectedRow}
            dialogTitle={dialogTitle}
            action={action}
            openForm={openForm}
            setOpenForm={setOpenForm}
            getAndSetBuildingMaterials={getAndSetBuildingMaterial} />
        ) : null}


      </div>
    </div>
  );
}
