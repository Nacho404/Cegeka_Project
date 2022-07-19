import axios from "axios";
import { Insert } from "../core/types";
import { User } from "../models/registration/user-model";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlRegister = `${baseUrl}/Authenticate`

export function register(user:Insert<User>) {
    return axios.post<User>(
        urlRegister + '/register',
        user
    )
}