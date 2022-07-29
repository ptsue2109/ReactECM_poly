import BaseURL from "./baseURL.service";
export const register = (newUser: any) => {
    const url = '/register';
    return BaseURL.post(url, newUser);
 }
 
 export const signin = async (params: any) => {
    const url = "/login";
    return BaseURL.post(url, params)
 };