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

export const updateUser = async(data: any) => {
   const url = `/users/update-user/${data._id}`
   return BaseURL.patch(url, data)
};

export const changePW = async(data: any) => {
   const url = `/users/update-password/${data._id}`
   return BaseURL.patch(url, data)
};