import React, { useState } from "react";
import "./Login.css";
import { validarUsuario } from "../helpers/login";
import { Link } from "react-router-dom"

import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const onInputChange = (value, setValue, setError) => {
        setValue(value);
        if (correo.trim() === '') {
            setEmailError('Por favor, ingresa tu correo electrónico.')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo.match(emailRegex)) {
            setEmailError('Por favor, ingresa una dirección de correo electrónico válida.')
            return
        }
        setError("");

    };

    const handlePasswordChange = (value) => {
        setPassword(value);
       
        if (password.trim() === '') {
            setPasswordError('Por favor ingrese su contraseña.')
            return
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{7,}$/;
        if (!password.match(passwordRegex)) {
            setPasswordError('La contraseña debe ser alfanumérica, con al menos una letra mayúscula, un carácter especial y password mayor a 8.')
            return
        }
        setPasswordError("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = () => {
        if(emailError!=='' || passwordError!==''){
            return
        }else{
            validarUsuario(correo,password,setEmailError,setPasswordError)
        }
    }

    return (
        <div className="divContainer">
            <div className="divGeneral border border-dark">
                <h1 className="texto">Login</h1>
                {/*<span>New Here? </span> <Link to="/register">Register</Link>*/}
                <div className="labelMail">
                    <label className="form-label">Mail</label>
                    <input
                        type="email"
                        className={`form-control ${emailError ? "input-error" : ""}`}
                        value={correo}
                        onChange={(e) => onInputChange(e.target.value, setCorreo, setEmailError)}
                    />
                    {emailError && <div className="error">{emailError}</div>}
                </div>
                <div className="inputPassword">
                    <label className="form-label">Password</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${passwordError ? "input-error" : ""}`}
                            aria-describedby="passwordHelpBlock"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                        <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {passwordError && <div className="error">{passwordError}</div>}
                </div>
                <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                {/*<span>forgot your </span> <Link to="/password">password</Link>*/}
            </div>
        </div>
    )
}