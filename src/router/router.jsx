import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../componentes/Login"
import { Registro } from "../componentes/registro"

export const Router = () => {
  return (
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Registro/>} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
  )
}