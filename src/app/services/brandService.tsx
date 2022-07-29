import BaseURL from "./baseURL.service";

 export const createBrands = async (brands: any) => {
    const url = "/brands/create";
    return BaseURL.post(url, brands)
 };

 export const removeBrand = (_id: string| undefined) => {
   const url = `/brands/remove-brands/${_id}`;
   return BaseURL.delete(url);
}


export const getProductByBrands = (slug: string | undefined) =>{
    const url = `/brands/get-products-by-slug/${slug}`;
    return BaseURL.get(url)
}