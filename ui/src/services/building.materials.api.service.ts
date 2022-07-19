import axios from 'axios'
import { BuildingMaterial } from "../models/nomenclators/building-material.model";
import { Insert } from "../core/types";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlBuildingMaterials = `${baseUrl}/buildingmaterials`
const urlSearchBuildingMaterials = `${baseUrl}/buildingmaterials/search/`

export function searchBuildingMaterials(searchString : string): Promise<BuildingMaterial[]> {
  return axios.get(urlSearchBuildingMaterials, { params: { pattern: searchString } }).then((r) => r.data)
}

export function getBuildingMaterials(): Promise<BuildingMaterial[]> {
  return axios.get(urlBuildingMaterials).then((r) => r.data)
}

export function insertBuildingMaterials(buildingMaterial: Insert<BuildingMaterial>) {
  return axios.post<BuildingMaterial>(
    urlBuildingMaterials,
    buildingMaterial
  )
}

export function updateBuildingMaterials(buildingMaterial: BuildingMaterial, id:number) {
  return axios.put<BuildingMaterial>(
    urlBuildingMaterials + `/${id}`,
    buildingMaterial
  )
}

export function deleteBuildingMaterials(id: number): Promise<{}> {
  return axios.delete<{}>(
    urlBuildingMaterials + `/${id}`
  );
}