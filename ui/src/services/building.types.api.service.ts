import axios from "axios";
import { Insert } from "../core/types";
import { BuildingType } from "../models/nomenclators/building-type.model";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlBuildingTypes = `${baseUrl}/buildingtypes`

export function getBuildingTypes(): Promise<BuildingType[]> {
  return axios.get(urlBuildingTypes).then((r) => r.data)
}

export function insertBuildingType(buildingType: Insert<BuildingType>) {
  return axios.post<BuildingType>(
    urlBuildingTypes,
    buildingType
  )
}

export function updateBuildingType(buildingType: BuildingType, id: number) {
  return axios.put<BuildingType>(
    urlBuildingTypes + `/${id}`,
    buildingType
  )
}

export function deleteBuildingType(id: number): Promise<{}> {
  return axios.delete<{}>(
    urlBuildingTypes + `/${id}`
  );
}