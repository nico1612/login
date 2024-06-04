
import { useNavigate } from "react-router-dom"
import { schemaRecuperarPassword } from "../schema/validations"
import { yupResolver } from "@hookform/resolvers/yup"
import { MyModal } from "./MyModal"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { EnviarPassword } from "../helpers/login"

export const RecordarPassword = () => {
  const navigate = useNavigate()
  const [modalShow,setModalShow]=useState(false)
  const [mensaje,setMensaje]=useState()
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schemaRecuperarPassword),
    mode: "onBlur",
    defaultValues: {
      correo: "",
    },
  })

  const onSubmit = async(data) => {
    setIsLoading(true)
    const response=await EnviarPassword(data.correo)
    setIsLoading(false)
    setModalShow(true)
    setMensaje(response)
  }

  const volver = () => {
    navigate("/")
  }

  const recuperar=()=>{
    setModalShow(false)
    navigate("/newPassword")
  }

  return (
    <>
      <div className="flexContainer">
        <div className="flexGeneral border border-dark">
          <h1>Forgot Password</h1>
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
            <button className="btn btn-dark" disabled={isLoading}>
              {isLoading ? "Loading..." : "Send"}</button>
          </form>
          <button className="btn volver btn-volver" onClick={volver}>home</button>
        </div>
      </div>
      <MyModal
        show={modalShow}
        handleClose={recuperar}
        texto={mensaje}
        boton="Cerrar"
        cabecera="Mail"
      />
    </>
  )
}
