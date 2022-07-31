import BaseURL from "./baseURL.service";


export const getAll = () => {
   const url = 'sliders';
   return BaseURL.get(url);
}

export const createSlider = async (sliders: any) => {
   const url = "/sliders/create";
   return BaseURL.post(url, sliders)
};

export const removeSlider = (_id: string| undefined) => {
  const url = `/sliders/remove/${_id}`;
  return BaseURL.delete(url);
}

export const updateSlider = async(sliders: any) => {
   const url = `/sliders/update/${sliders._id}`
   return BaseURL.patch(url, sliders)
};