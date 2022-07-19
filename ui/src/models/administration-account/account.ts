export interface Account {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    currentlyRoleName: string;
    newRoleName: string|null;
    changePassword: boolean;
    password: string|null;
}
  