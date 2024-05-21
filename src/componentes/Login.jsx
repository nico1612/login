import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFont } from "react-icons/fa";
import "./Login.css";
import { validarUsuario } from "../helpers/login";
import { schemaLogin } from "../schema/validations";
import { MyModal } from "./MyModal";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mailError, setMailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(schemaLogin),
    mode: 'onBlur',
    defaultValues: {
      correo: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await validarUsuario(data.correo, data.password, setMailError, setPasswordError, setUsuarioRegistrado);
    setIsLoading(false);
    if (usuarioRegistrado) {
      setModalShow(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCapsLock = (e) => {
    setIsCapsLockActive(e.getModifierState("CapsLock"));
  };

  return (
    <>
      <div className="flexContainer">
        <div className="flexGeneral border border-dark">
          <h1 className="texto">Login</h1>
          <div className="linkRegistro"> New Here? <Link to="/register">Register</Link></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="labelMail">
              <label className="form-label">Mail</label>
              <input
                type="email"
                className={`form-control ${errors.correo ? "input-error" : ""}`}
                {...register("correo")}
                onKeyDown={handleCapsLock}
                onKeyUp={handleCapsLock}
              />
              {isCapsLockActive && <FaFont className="caps-lock-icon" />}
              {errors.correo && <div className="error">{errors.correo.message}</div>}
              {mailError && <div className="error">{mailError}</div>}
            </div>
            <div className="inputPassword">
              <label className="form-label">Password</label>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${errors.password ? "input-error" : ""}`}
                  {...register("password")}
                  onKeyDown={handleCapsLock}
                  onKeyUp={handleCapsLock}
                />
                {isCapsLockActive && <FaFont className="caps-lock-icon" />}
                <button type="button" className="toggle-password" onClick={togglePasswordVisibility} aria-label="Toggle password visibility">
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && <div className="error">{errors.password.message}</div>}
              {passwordError && <div className="error">{passwordError}</div>}
            </div>
            <button type="submit" className="btn btn-dark left" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Login"}
            </button>
          </form>
          <div className="left2">
            Forgot your <Link to="/password">password</Link>?
          </div>
        </div>
      </div>
      <MyModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        texto="El usuario se encontró correctamente"
        boton="Ingresar"
        cabecera="Registrado"
      />
    </>
  )
}