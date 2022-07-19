import axios from "axios";
import { Insert } from "../core/types";
import { NormativeElementDto } from "../models/normative/normative-dto-model";
import { NormativeElement } from "../models/normative/normative-model";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlNormative = `${baseUrl}/NormativeElements`

export function getAllNormativeElements(): Promise<NormativeElement[]> {
  return axios.get(urlNormative).then((r) => r.data)
}

export function getNormative(id: number): Promise<NormativeElement> {
  return axios.get(urlNormative + '/' + id).then((r) => mizerie(r.data))
}

export function insertNormativeElement(normative: Insert<NormativeElementDto>) {
  return axios.post<NormativeElementDto>(
    urlNormative,
    normative
  )
}

export function updateNormativeElement(normative: NormativeElementDto, id: number) {
  return axios.put<NormativeElementDto>(
    urlNormative + `/${id}`,
    normative
  )
}

export function deleteNormativeElement(id: number): Promise<{}> {
  return axios.delete<{}>(
    urlNormative + `/${id}`
  );
}

export function getNextChildTitle(parentId: number): Promise<string> {
  return axios.get(`${urlNormative}/${parentId}/nextChildTitle`).then((r) => r.data?.title)
}

function mizerie(data: NormativeElement): NormativeElement {
  if(data.content == '<p><br></p>')
    data.content = '<p></p>'  

    data.children?.forEach(element => {
      mizerie(element)  
    });

    return data;
}
