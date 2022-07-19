export type Insert<T> = Omit<T,'id'>;

export enum ActionsTypesFrom {
    Edit = "MODIFICĂ",
    Add = "ADAUGĂ"
}

export const DataGridPropsStyling = {
    boxShadow: 5,
    border: 2,
    borderColor: "#1976d2",
    borderInline: "#1976d2",
    '& .MuiDataGrid-row:hover': { backgroundColor: '#d1e6fa', color: "#1976d2", fontWeight: "bold"}
}

export enum UserRoles {
    Architect = "Architect",
    Administrator = "Administrator"
}

export interface Token {
    name: string;
    email: string;
    role: string;
    nbf: number;
    exp: number;
    iat: number;
}


export const validationMessage = "Acest camp este obligatoriu!";