import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { validarUsuario } from "../helpers/login";
import { schema } from "../schema/validations";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mailError,setMailError]=useState('')
  const [passwordError,setPasswordError]=useState('')

  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      correo: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
    validarUsuario(data.correo, data.password,setMailError,setPasswordError);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flexContainer">
      <div className="flexGeneral border border-dark">
        <h1 className="texto">Login</h1>
        <div className="linkRegistro"> New Here? <Link to="/register">Register</Link></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="labelMail">
            <label className="form-label">Mail</label>
            <Controller
              name="correo"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className={`form-control ${errors.correo ? "input-error" : ""}`}
                />
              )}
            />
            {errors.correo && <div className="error">{errors.correo.message}</div>}
            {mailError &&<div className="error">{mailError}</div> }
          </div>
          <div className="inputPassword">
            <label className="form-label">Password</label>
            <div className="password-input-container">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? "input-error" : ""}`}
                    aria-describedby="passwordHelpBlock"
                  />
                )}
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                {!showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <div className="error">{errors.password.message}</div>}
            {passwordError!=='' &&<div className="error">{passwordError}</div> }
          </div>
          <button type="submit" className="btn btn-dark left">Login</button>
        </form>
        <div className="left2">
          Forgot your <Link to="/password">password</Link>?
        </div>
      </div>
    </div>
  );
};
