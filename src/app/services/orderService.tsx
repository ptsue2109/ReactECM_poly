import BaseURL from "./baseURL.service";


export const customAddToCart = async (data:any) => {
   const url = `/orders/creat-by-custom`
   return BaseURL.post(url, data);
}

export const getAllOrder = async() => {
   const url = 'orders';
   return BaseURL.get(url);
}

export const getAllOrderDeleteted = async() => {
   const url = '/orders/deleted';
   return BaseURL.get(url);
}

export const changeOrderStatus = async (record: string, status:any) =>{
   const url = `/orders/change-status/${record}`;
   return BaseURL.patch(url, status)
}

export const softDeleteOrder = async (orderId: string) =>{
   const url = `/orders/softDelte-by-orderCode/${orderId}`;
   return BaseURL.delete(url)
}

export const restore = async (orderId: string) =>{
   const url = `/orders/restore-by-id/${orderId}`;
   return BaseURL.patch(url)
}

export const usersOrderList = async (userId: string) =>{
   const url = `/orders/get-user-order/${userId}`;
   return BaseURL.get(url)
}
