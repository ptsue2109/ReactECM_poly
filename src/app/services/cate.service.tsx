import BaseURL from "./baseURL.service";
export const getAll = () => {
    const url = 'categories';
    return BaseURL.get(url);
 }
 
 export const createCate = async (categories: any) => {
    const url = "categories/create";
    return BaseURL.post(url, categories)
 };

 export const removeCate = (_id: string| undefined) => {
   const url = `/categories/remove-cate/${_id}`;
   return BaseURL.delete(url);
}


export const getProductByCate = (slug: string | undefined) =>{
    const url = `/categories/get-detail-by-slug/${slug}`;
    return BaseURL.get(url)
}

