import { BuildingMaterial } from "../nomenclators/building-material.model";

export interface Project{
    userId?:string;
    id?:number;
    buildingTypeId?:number;
    buildingMaterialsIds:number[];
    name:string;
    height:number;
    width: number;
    length: number;
    hasUndergroundFloors:boolean;
    hasElevator:boolean;
    technicalLeadDensity:number;
    isDraft:boolean;
    buildingMaterialsNames?:[];
    buildingTypeName?:string;
    userName?:any;
}