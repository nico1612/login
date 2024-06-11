// src/auth/auth.js
import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
        nombre: null,
        correo: null,
        error: false,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.correo = payload.usuario.correo;
            state.nombre = payload.usuario.nombre;
        },
        logout: (state) => {
            state.status = 'not-authenticated';
            state.correo = null;
            state.nombre = null;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
        actualizar: (state, { payload }) => {
            state.consultas = state.consultas + payload.usuario.consultas;
        },
        setError: (state) => {
            state.error = !state.error;
        },
    },
});

export const { login, logout, checkingCredentials, actualizar, setError } = authSlice.actions;
export default authSlice.reducer;
