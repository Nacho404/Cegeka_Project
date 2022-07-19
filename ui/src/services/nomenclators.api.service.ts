import { Nomenclator } from "../models/nomenclators/nomenclator-model";
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL;

const urlNomenclatores = `${baseUrl}/nomenclatortypes`


export function getNomenclatores(): Promise<Nomenclator[]> {
  return axios.get(urlNomenclatores).then((r) => r.data)
}