import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../componentes/Login"
import { Registro } from "../componentes/registro"
import { RecordarPassword } from "../componentes/RecordarPassword"

export const Router = () => {
  return (
    <>
      <img
        src="src/img/logo.png"
        style={{ width: "100px", height: "auto" }}
        alt="Descripción de la imagen" 
      />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Registro/>}/>
        <Route path="/password" element={<RecordarPassword/>}/>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}