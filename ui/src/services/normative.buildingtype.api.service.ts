import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlNormative = `${baseUrl}/NormativeElementsProject`

export function getNormativeByBuildingType(id : number){
    return axios.get(urlNormative + '/' + id).then((r) => r.data)
  }
