import { useNavigate } from "react-router-dom"
import { schemaNewPassword } from "../schema/validations"
import { yupResolver } from "@hookform/resolvers/yup"
import { MyModal } from "./MyModal"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash, FaFont } from "react-icons/fa"
import { newPassword } from "../helpers/login"

export const NewPassword = () => {
  const navigate = useNavigate()
  const [modalShow,setModalShow]=useState(false)
  const [mensaje,setMensaje]=useState()
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCapsLockActive, setIsCapsLockActive] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReingresePassword, setShowReingresePassword] = useState(false);
  const [funcion,setFuncion]=useState(false)

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCapsLock = (e) => {
    setIsCapsLockActive(e.getModifierState("CapsLock"));
  };

  const toggleReingresePasswordVisibility = () => {
    setShowReingresePassword(!showReingresePassword);
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schemaNewPassword),
    mode: "onBlur",
    defaultValues: {
      correo: "",
      password:"",
      newPassword:"",
      reingresePassword:""
    },
  })

  const navegar=()=>{
    setModalShow(false)
    navigate('/')
  }

  const onSubmit = async(data) => {
    setIsLoading(true)
    setIsLoading(false)
    const response=await newPassword(data.correo,data.password,data.newPassword)
    setModalShow(true)
    setMensaje((await response).mensaje)
    setFuncion(response.funcion)
  }

  const volver = () => {
    navigate("/")
  }

  const volverAtras = () => {
    navigate(-1)
  }

  return (
    <>
      <img
        src="src/img/logo.png"
        style={{ width: "100px", height: "auto" }}
        alt="Descripción de la imagen" 
      />
      <div style={{position:'relative', top:'120px'}}>
      <div className="flexContainer">
          <div className="flexGeneral border border-dark">
          <h1>New Password</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="labelMail">
              <label className="form-label">Mail</label>
              <input
                  type="email"
                  className={`form-control ${errors.correo ? "is-invalid" : ""}`}
                  {...register("correo")}
              />
              {errors.correo && (
                  <div className="invalid-feedback">{errors.correo.message}</div>
              )}
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
                  <label className="form-label">New Password</label>
                  <div className="input-container">
                      <input
                          type={showNewPassword ? "text" : "password"}
                          className={`form-control ${errors.newPassword ? "input-error" : ""}`}
                          {...register("newPassword")}
                          onKeyDown={handleCapsLock}
                          onKeyUp={handleCapsLock}
                      />
                      {isCapsLockActive && <FaFont className="caps-lock-icon" />}
                      <button type="button" className="toggle-password" onClick={toggleNewPasswordVisibility} aria-label="Toggle password visibility">
                          {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                  </div>
                  {errors.newPassword && <div className="error">{errors.newPassword.message}</div>}
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
              <button className="btn btn-dark" disabled={isLoading}>
              {isLoading ? "Loading..." : "Change password"}</button>
          </form>
          <button className="btn btn-dark" onClick={volver}>Home</button>
          <button className="btn btn-dark" onClick={volverAtras}>Back</button>
          </div>
      </div>
      </div>
      <MyModal
          show={modalShow}
          handleClose={funcion?navegar:()=>setModalShow(false)}
          texto={mensaje}
          boton="Cerrar"
          cabecera="Mail"
      />
    </>
  )
}
