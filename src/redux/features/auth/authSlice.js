import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {},

};

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setData: (state, action) => {
            state.userData = {...state.userData, ...action.payload}
        }
      
    }
})

export const {setData} = authSlice.actions;

export default authSlice.reducer;