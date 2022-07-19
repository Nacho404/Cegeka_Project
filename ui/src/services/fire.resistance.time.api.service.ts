import axios from "axios";
import { Insert } from "../core/types";
import { FireResistanceDegree } from "../models/nomenclators/fire-resistance-degree.model";
import { FireResistanceTime } from "../models/nomenclators/fire-resistance-time.model";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlFireResistanceTimes = `${baseUrl}/fireresistances`

export function getFireResistanceTime(): Promise<FireResistanceTime[]> {
  return axios.get(urlFireResistanceTimes).then((r) => r.data)
}

export function getFireResistanceDegree(): Promise<FireResistanceDegree[]> {
  return axios.get(urlFireResistanceTimes +`/${"firedegrees"}`).then((r) => r.data)
}

export function insertFireResistanceTime(fireResistanceTime: Insert<FireResistanceTime>) {
  return axios.post<FireResistanceTime>(
    urlFireResistanceTimes,
    fireResistanceTime
  )
}

export function updateFireResistanceTime(fireResistanceTime: FireResistanceTime, id: number) {
  return axios.put<FireResistanceTime>(
    urlFireResistanceTimes + `/${id}`,
    fireResistanceTime
  )
}

export function deleteFireResistanceTime(id: number): Promise<{}> {
  return axios.delete<{}>(
    urlFireResistanceTimes + `/${id}`
  );
}
