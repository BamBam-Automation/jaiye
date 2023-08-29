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
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("username", action.payload.username)
            state.user=action.payload.user
        },
        logout: (state) => {
            state.isAuthenticated = false
            localStorage.clear()
            state.user={}
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer