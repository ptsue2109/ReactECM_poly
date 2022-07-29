import BaseURL from "./baseURL.service";
export const getAll = () => {
    const url = 'products';
    return BaseURL.get(url);
 }
 
 export const createProducts = async (product: any) => {
    const url = "products/create";
    return BaseURL.post(url, product)
 };


 export const removeProduct = async (_id: string | undefined) => {
   const url = `products/remove-book/${_id}`
    return BaseURL.delete(url)
 }

 export const updateProduct = async(product: any) => {
   const url = `products/update-book/${product._id}`
   return BaseURL.patch(url, product)
};