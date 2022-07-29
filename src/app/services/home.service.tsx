import BaseURL from "./baseURL.service";
export const getHomeData = () => {
    const url = 'home';
    return BaseURL.get(url);
 }
 