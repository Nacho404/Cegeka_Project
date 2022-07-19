import axios from "axios";
import { Insert } from "../core/types";
import { Account } from "../models/administration-account/account";
import { User } from "../models/registration/user-model";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlAccountsAdministration = `${baseUrl}/accountsadministration`

export function getAccounts(): Promise<Account[]> {
  return axios.get(urlAccountsAdministration).then((r) => r.data)
}


export function insertAccount(account: Insert<User>, roleName: string) {
  return axios.post<Account>(
    urlAccountsAdministration + `/${roleName}`,
    account
  )
}

export function updateAccount(account: Account) {
  return axios.put<Account>(
    urlAccountsAdministration,
    account
  )
}

export function deleteAccount(userId: string): Promise<{}> {
  return axios.delete<{}>(
    urlAccountsAdministration + `/${userId}`
  );
}