import React, { useState } from "react"
import { Link } from "react-router-dom"

export const Registro = () => {
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [reingresePassword, setReingresePassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [reingresePasswordError, setReingresePasswordError] = useState('')
    const [name, setName] = useState('')

    const onInputChange = (value) => {
        setCorreo(value)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!correo.match(emailRegex)) {
            setEmailError('Por favor, ingresa una dirección de correo electrónico válida.')
        } else {
            setEmailError('')
        }
    }

    const handlePasswordChange = (value) => {
        setPassword(value)
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{8,}$/
        if (!password.match(passwordRegex)) {
            setPasswordError('La contraseña debe ser alfanumérica, con al menos una letra mayúscula y un carácter especial.')
        } else {
            setPasswordError('')
        }
    }

    const handleReingresePasswordChange = (value) => {
        setReingresePassword(value)
        if (password !== reingresePassword) {
            setReingresePasswordError('Las contraseñas no coinciden.')
        } else {
            setReingresePasswordError('')
        }
    }

    const handleName=(value)=>{
        setName(value)
    }

    const handleSubmit = () => {
        if (correo.trim() === '') {
            setEmailError('Por favor, ingresa tu correo electrónico.')
        }

        if (password.trim() === '') {
            setPasswordError('Por favor ingrese su contraseña.')
        }

        if (reingresePasswordError.trim() === '') {
            setReingresePasswordError('Por favor reingrese su contraseña.')
        }

        if (emailError !== '' || passwordError !== '' || reingresePasswordError !== '') {
            return
        }
    }

    return (
        <div className="flexContainer">
            <div className="flexGeneral border border-dark">
                <h1 className="texto">Create new Account</h1>
                <div className="linkRegistro"> AlreadyRegistered? <Link to="/">Login</Link></div>
                <div className="labelMail">
                    <label className="form-label">Name</label>
                    <input
                        type="email"
                        className={`form-control ${emailError ? "input-error" : ""}`}
                        value={name}
                        onChange={(e) => handleName(e.target.value)}
                    />
                    {emailError && <div className="error">{emailError}</div>}
                </div>
                <div className="labelMail">
                    <label className="form-label">Mail</label>
                    <input
                        type="email"
                        className={`form-control ${emailError ? 'input-error' : ''}`}
                        value={correo}
                        onChange={(e) => onInputChange(e.target.value)}
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
                <div className="inputPassword">
                    <label className="form-label">Reingrese Password</label>
                    <input
                        type="password"
                        className={`form-control ${reingresePasswordError ? 'input-error' : ''}`}
                        aria-describedby="passwordHelpBlock"
                        value={reingresePassword}
                        onChange={(e) => handleReingresePasswordChange(e.target.value)}
                    />
                    {reingresePasswordError && <div className="error">{reingresePasswordError}</div>}
                </div>
                <button className="btn btn-dark" onClick={handleSubmit}>Registrar</button>
            </div>
        </div>
    )
}
