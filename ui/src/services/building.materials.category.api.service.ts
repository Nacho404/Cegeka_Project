import axios from "axios";
import { Insert } from "../core/types";
import { MaterialsCategory } from "../models/nomenclators/building-material-category.model";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlMaterialsCategories = `${baseUrl}/buildingmaterialscategories`

export function getMaterialsCategories(): Promise<MaterialsCategory[]> {
  return axios.get(urlMaterialsCategories).then((r) => r.data)
}

export function insertMaterialsCategories(materialsCategory: Insert<MaterialsCategory>) {
  return axios.post<MaterialsCategory>(
    urlMaterialsCategories,
    materialsCategory
  )
}

export function updateMaterialsCategories(materialsCategory: MaterialsCategory, id: number) {
  return axios.put<MaterialsCategory>(
    urlMaterialsCategories + `/${id}`,
    materialsCategory
  )
}

export function deleteMaterialsCategories(id: number): Promise<{}> {
  return axios.delete<{}>(
    urlMaterialsCategories + `/${id}`
  );
}