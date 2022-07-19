import axios from "axios";
import { Insert } from "../core/types";
import { MaterialSubcategory } from "../models/nomenclators/building-material-subcategory.model";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlBuildingMaterialsSubcategories = `${baseUrl}/buildingmaterialssubcategories`

export function getBuildingMaterialsSubcategories(): Promise<MaterialSubcategory[]> {
  return axios.get(urlBuildingMaterialsSubcategories).then((r) => r.data)
}

export function insertBuildingMaterialSubcategory(materialSubcategory: Insert<MaterialSubcategory>) {
  return axios.post<MaterialSubcategory>(
    urlBuildingMaterialsSubcategories,
    materialSubcategory
  )
}

export function updateBuildingMaterialSubcategory(materialSubcategory: MaterialSubcategory, id: number) {
  return axios.put<MaterialSubcategory>(
    urlBuildingMaterialsSubcategories + `/${id}`,
    materialSubcategory
  )
}

export function deleteBuildingMaterialSubcategory(id: number): Promise<{}> {
  return axios.delete<{}>(
    urlBuildingMaterialsSubcategories + `/${id}`
  );
}