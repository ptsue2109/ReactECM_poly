import {
   AsyncFetchSliders,
   RemoveSlider,
   CreateSliders,
   UpdateSlider,
 } from "../thunks/sliderThunk";
 import { createSlice } from "@reduxjs/toolkit";
 
 type Sliderstate = {
   sliders: any[];
   isFetching: boolean;
   isSucess: boolean;
   isErr : boolean;
   errorMessage: string | undefined;
 };
 
 const initialState: Sliderstate = {
   sliders: [],
   isFetching: false,
   isSucess: false,
   isErr:false,
   errorMessage: "",
 };
 const sliderSlice = createSlice({
   name: "sliders",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
     // lisst
     builder.addCase(AsyncFetchSliders.pending, (state) => {
       state.isFetching = true;
       state.isSucess = false;
     });
     builder.addCase(AsyncFetchSliders.fulfilled, (state, action) => {
       state.isFetching = false;
       state.isSucess = false;
       state.sliders = action.payload;
     });
     builder.addCase(AsyncFetchSliders.rejected, (state, action) => {
       state.isFetching = false;
       state.isSucess = false;
       state.errorMessage = action.payload;
     });
 
     //delete
     builder.addCase(RemoveSlider.pending, (state) => {
       state.isFetching = true;
     });
     builder.addCase(RemoveSlider.fulfilled, (state, action) => {
       state.isFetching = false;
       state.sliders = state.sliders.filter(
         (item) => item._id !== action.payload._id
       );
     });
     builder.addCase(RemoveSlider.rejected, (state, action) => {
       state.isFetching = false;
       state.errorMessage = action.payload;
     });
 
     //create
     builder.addCase(CreateSliders.pending, (state, action) => {
       state.isFetching = true;
       state.isSucess = false;
       state.isErr = false;
     });
     builder.addCase(CreateSliders.fulfilled, (state, action) => {
       state.isFetching = false;
       state.isSucess = true;
       state.isErr = false;
       state.sliders.push(action.payload);
     });
     builder.addCase(CreateSliders.rejected, (state, action) => {
       state.isFetching = false;
       state.isSucess = false;
       state.isErr = true;
       state.errorMessage = action.payload;
     });
     //update
     builder.addCase(UpdateSlider.pending, (state) => {
       state.isFetching = true;
       state.isSucess = false;
       state.isErr = false;
     });
     builder.addCase(UpdateSlider.fulfilled, (state, action) => {
       state.isFetching = false;
       state.isSucess = true;
       state.isErr = false;
       state.sliders = state.sliders.map((item) =>
         item._id !== action.payload._id ? item : action.payload
       );
     });
     builder.addCase(UpdateSlider.rejected, (state, action) => {
       state.isFetching = false;
       state.isSucess = false;
       state.isErr = true;
       state.errorMessage = action.payload;
     });
   },
 });
 
 export default sliderSlice.reducer;