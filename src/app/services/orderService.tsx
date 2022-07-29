import BaseURL from "./baseURL.service";


export const customAddToCart = async (data:any) => {
   const url = `/orders/creat-by-custom`
   return BaseURL.post(url, data);
}
