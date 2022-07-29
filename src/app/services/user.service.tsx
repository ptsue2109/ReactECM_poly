import BaseURL from "./baseURL.service";
export const getAllUser = () => {
    const url = 'users';
    return BaseURL.get(url);
 }
 
 export const createUser = async (users: any) => {
    const url = "users/create";
    return BaseURL.post(url, users)
 };

 export const removeUser = (_id: string| undefined) => {
   const url = `/users/remove-user/${_id}`;
   return BaseURL.delete(url);
}
