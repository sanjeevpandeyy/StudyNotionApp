import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    analytics:null,
    pendingCourses:[],
    users:[],
    students:[],
    instructors:[],
    loading:false,
};


const adminSlice=createSlice({

    name:"admin",

    initialState,

    reducers:{

        setAnalytics:(state,action)=>{
            state.analytics=action.payload;
        },


        setPendingCourses:(state,action)=>{
            state.pendingCourses=action.payload;
        },


        setUsers:(state,action)=>{
            state.users=action.payload;
        },


        setStudents:(state,action)=>{
            state.students=action.payload;
        },


        setInstructors:(state,action)=>{
            state.instructors=action.payload;
        },


        setLoading:(state,action)=>{
            state.loading=action.payload;
        },


        resetAdminState:(state)=>{
            state.analytics=null;
            state.pendingCourses=[];
            state.users=[];
            state.students=[];
            state.instructors=[];
        },

    }

});


export const {
    setAnalytics,
    setPendingCourses,
    setUsers,
    setStudents,
    setInstructors,
    setLoading,
    resetAdminState,

}=adminSlice.actions;


export default adminSlice.reducer;