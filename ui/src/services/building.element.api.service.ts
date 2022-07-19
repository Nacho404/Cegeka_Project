import axios from "axios";
import { Insert } from "../core/types";
import { BuildingElement } from "../models/nomenclators/building-element.model";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlBuildingElements = `${baseUrl}/buildingelementstypes`

export function getBuildingElements(): Promise<BuildingElement[]> {
  return axios.get(urlBuildingElements).then((r) => r.data)
}


export function insertBuildingElement(buildingElement: Insert<BuildingElement>) {
  return axios.post<BuildingElement>(
    urlBuildingElements,
    buildingElement
  )
}

export function updateBuildingElement(buildingElement: BuildingElement, id: number) {
  return axios.put<BuildingElement>(
    urlBuildingElements + `/${id}`,
    buildingElement
  )
}

export function deleteBuildingElement(id: number): Promise<{}> {
  return axios.delete<{}>(
    urlBuildingElements + `/${id}`
  );
}