import React, { useState } from "react"
import "./Login.css"
import { validarUsuario } from "../helpers/login"

export const Login = () => {
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const onInputChange = (value, setValue, setError) => {
        setValue(value)
        setError('')
    }

    const handlePasswordChange = (value) => {
        setPassword(value)
        setPasswordError('')
    }

    const handleSubmit = () => {
        if (correo.trim() === '') {
            setEmailError('Por favor, ingresa tu correo electrónico.')
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo.match(emailRegex)) {
            setEmailError('Por favor, ingresa una dirección de correo electrónico válida.')
        }

        if (password.trim() === '') {
            setPasswordError('Por favor ingrese su contraseña.')
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{8,}$/;
        if (!password.match(passwordRegex)) {
            setPasswordError('La contraseña debe ser alfanumérica, con al menos una letra mayúscula y un carácter especial.')
        }
        console.log(password)
        console.log(!password.match(passwordRegex))

        if(emailError!=='' || passwordError!==''){
            return
        }else{
            validarUsuario(correo,password,setEmailError,setPasswordError)
        }
    }

    return (
        <div className="divContainer">
            <div className="divGeneral border border-dark">
                <h1 className="texto">Iniciar sesión</h1>
                <div className="labelMail">
                    <label className="form-label">Mail</label>
                    <input
                        type="email"
                        className={`form-control ${emailError ? 'input-error' : ''}`}
                        value={correo}
                        onChange={(e) => onInputChange(e.target.value, setCorreo, setEmailError)}
                    />
                    {emailError && <div className="error">{emailError}</div>}
                </div>
                <div className="inputPassword">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${passwordError ? 'input-error' : ''}`}
                        aria-describedby="passwordHelpBlock"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                    {passwordError && <div className="error">{passwordError}</div>}
                </div>
                <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}
