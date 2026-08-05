import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    setToken: (state, action) => {
      state.token = action.payload;

      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setToken, setLoading } = authSlice.actions;

export default authSlice.reducer;
