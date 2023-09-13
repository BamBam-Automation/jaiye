import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: null,
        user:{}
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            sessionStorage.setItem("token", action.payload.token)
            sessionStorage.setItem("username", action.payload.username)
            state.user=action.payload.data
        },
        logout: (state) => {
            state.isAuthenticated = false
            sessionStorage.clear()
            state.user={}
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer