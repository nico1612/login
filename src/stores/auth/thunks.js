import axios from "axios";
import { checkingCredentials, login, logout, setError } from "./auth";

const url = import.meta.env.VITE_APP_IP;

export const startLogin = (mail, password, setMailError, setPasswordError) => async (dispatch) => {
    try {
        dispatch(checkingCredentials());

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: { correo: mail, password: password },
        };

        const response = await axios(`${url}/api/auth/login`, options);
        if (response?.data?.usuario) {
            setMailError('');
            setPasswordError('');

            const { data } = response;
            const dataJSON = JSON.stringify(data.usuario);
            localStorage.setItem("usuario", dataJSON);

            dispatch(login(data));
            return { ok: true, msg: response?.data?.msg };
        } else {
            dispatch(setError());
            setMailError('Invalid mail');
            setPasswordError('Invalid password');
            return { ok: false, msg: "Invalid credentials" };
        }
    } catch (error) {
        dispatch(setError());
        setMailError('Invalid mail');
        setPasswordError('Invalid password');
        return { ok: false, msg: error.response?.data?.msg || "Login failed" };
    }
};

export const crearUsuario = (mail, password, name) => async (dispatch) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: { nombre: name, correo: mail, password: password },
        };

        const response = await axios(`${url}/api/auth`, options);
        if (response?.data?.usuario) {
            dispatch(login(response.data));
            return { ok: true, msg: "User created successfully" };
        } else {
            return { ok: false, msg: "User creation failed" };
        }
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return { ok: false, msg: error.response?.data?.msg || "Error creating user" };
    }
};

export const startLogout = (correo) => async (dispatch) => {
    try {
        localStorage.removeItem("usuario");
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: { correo },
        };

        await axios(`${url}/api/auth/logout`, options)
        dispatch(logout());

        return { ok: true, msg: "Logged out successfully" };
    } catch (error) {
        console.error("Error during logout:", error);
        return { ok: false, msg: error.message || "Logout failed" };
    }
};
