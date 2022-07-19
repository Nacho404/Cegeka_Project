import jwt_decode from 'jwt-decode';
import { Token } from "../core/types";

export const TOKEN_COOKIE = "token"

export function decode_data(token: any) {
    let decoded_data: Token = jwt_decode(token);
    return decoded_data;
}

export function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for (const cookie of cookies) {
        let cookieValue = cookie.trim();
        if (cookieValue.indexOf(name) == 0) {
            return cookieValue.substring(name.length, cookieValue.length);
        }
    }
    return "";
}

export function deleteCookie(name: string, path?: string) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ";path=" + ((path) ? path : "/") +
            ";expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
}

export function setCookie(name: string, value: string, expiry: Date, path?: string) {
    document.cookie = name + "=" + value +
        ";path=" + ((path) ? path : "/") +
        ";expires=" + expiry;
}