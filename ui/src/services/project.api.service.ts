import axios from "axios";
import { Insert } from "../core/types";
import { Project } from "../models/project/project-model";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlProjects = `${baseUrl}/projects`

export function getProjects(): Promise<Project[]> {
  return axios.get(urlProjects).then((r) => r.data)
}

export function insertProject(project: Insert<Project>) {
  return axios.post<Project>(
    urlProjects,
    project
  )
}

export function updateProject(project: Project, id: number) {
  return axios.put<Project>(
    urlProjects + `/${id}`,
    project
  )
}

export function deleteProject(id: number): Promise<{}> {
  return axios.delete<{}>(
    urlProjects + `/${id}`
  );
}