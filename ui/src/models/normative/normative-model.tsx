export interface NormativeElement {
    id:number,
    title:string;
    content:string;
    hierarchyId: string;
    level: number;
    isActive:boolean;
    order:number;
    buildingTypeId:number;
    buildingType?:any
    children?: readonly NormativeElement[];
}