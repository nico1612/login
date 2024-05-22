import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../componentes/Login"
import { Registro } from "../componentes/registro"
import { RecordarPassword } from "../componentes/RecordarPassword"
import { TaskManajer } from "../componentes/TaskManajer"

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Registro/>}/>
        <Route path="/password" element={<RecordarPassword/>}/>
        <Route path="/TaskManajer" element={<TaskManajer/>}/>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}