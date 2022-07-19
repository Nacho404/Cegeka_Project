import axios from 'axios'
import { deleteCookie, TOKEN_COOKIE } from '../utils/cookie';
const baseUrl = import.meta.env.VITE_BASE_URL;
const urlRegister = `${baseUrl}/Authenticate`

export function logout(){
    return axios.post(
        urlRegister + '/logout'
    ).then(() => {
        deleteCookie(TOKEN_COOKIE);
    })
}