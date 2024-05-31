import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../componentes/Login"
import { Registro } from "../componentes/registro"
import { TaskManager } from "../componentes/TaskManajer"
import { RecordarPassword } from "../componentes/cambiarContraseña"

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Registro/>}/>
        <Route path="/password" element={<RecordarPassword/>}/>
        <Route path="/TaskManajer" element={<TaskManager/>}/>
        <Route path="/change-password" element={<RecordarPassword/>}/>
        <Route path="/*" element={<Navigate to="/"/>}/>
      </Routes>
    </>
  )
}