import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../schema/validations";
import { FaEye, FaEyeSlash, FaFont } from "react-icons/fa";
import { MyModal } from "./MyModal";
import { crearUsuario } from "../stores/auth/thunks";
import { useDispatch } from "react-redux";

export const Registro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showReingresePassword, setShowReingresePassword] = useState(false);
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [datos,setDatos]=useState(true)
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(schemaRegister),
    mode: 'onBlur',
    defaultValues: {
      correo: '',
      password: ''
    }
  });

  const onSubmit = async(data) => {
    const result=await dispatch(crearUsuario(data.correo,data.password,data.name))
    setModalShow(result!==false)
    setDatos(result.ok)
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleReingresePasswordVisibility = () => {
    setShowReingresePassword(!showReingresePassword);
  };

  const handleCapsLock = (e) => {
    setIsCapsLockActive(e.getModifierState("CapsLock"));
  };

  const navegar = () => {
    setModalShow(false);
    navigate('/task-manager');
  };


  return (
    <>
      <img
          src="src/img/logo.png"
          style={{ width: "100px", height: "auto" }}
          alt="Descripción de la imagen" 
      />
      <div className="flexContainer">
          <div className="flexGeneralRegister border border-dark">
              <h1 className="texto">Create new Account</h1>
              <div className="linkRegistro">
              Already Registered? <Link to="/">Login</Link>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="labelMail">
                  <label className="form-label">Name</label>
                  <input
                  type="text"
                  className={`form-control ${errors.name ? "input-error" : ""}`}
                  onKeyDown={handleCapsLock}
                  onKeyUp={handleCapsLock}
                  {...register("name")}
                  />
                  {isCapsLockActive && <FaFont className="caps-lock-icon3" />}
                  {errors.name && <div className="error">{errors.name.message}</div>}
              </div>
              <div className="labelMail">
                  <label className="form-label">Mail</label>
                  <input
                  type="email"
                  className={`form-control ${errors.correo ? "input-error" : ""}`}
                  {...register("correo")}
                  onKeyDown={handleCapsLock}
                  onKeyUp={handleCapsLock}
                  />
                  {isCapsLockActive && <FaFont className="caps-lock-icon2" />}
                  {errors.correo && <div className="error">{errors.correo.message}</div>}
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
              </div>
              <div className="inputPassword">
                  <label className="form-label">Reenter password</label>
                  <div className="input-container">
                  <input
                      type={showReingresePassword ? "text" : "password"}
                      className={`form-control ${errors.reingresePassword ? "input-error" : ""}`}
                      {...register("reingresePassword")}
                      onKeyDown={handleCapsLock}
                      onKeyUp={handleCapsLock}
                  />
                  {isCapsLockActive && <FaFont className="caps-lock-icon" />}
                  <button type="button" className="toggle-password" onClick={toggleReingresePasswordVisibility} aria-label="Toggle reenter password visibility">
                      {showReingresePassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  </div>
                  {errors.reingresePassword && <div className="error">{errors.reingresePassword.message}</div>}
              </div>
              <button className="btn btn-dark" type="submit">Registrar</button>
              </form>
          </div>
      </div>
      <MyModal
        show={modalShow}
        handleClose={datos?navegar:()=>setModalShow(false)}
        texto={datos?
          "User created successfully":"user already exists"}
        boton = {datos ? "Login" : "OK"}
        cabecera="Registrado"
      />
    </>
  );
};
