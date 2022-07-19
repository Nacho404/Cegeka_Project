export interface Nomenclator {
  id: number;
  name: string;
  iconUrl: string, // format expecting from backend --> "<ApartmentIcon fontSize="large" />"
  route: string, // format expecting from backend --> "/nomenclatoare/tipuricladire"
  numberOfItems: number
}
