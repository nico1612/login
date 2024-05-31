import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../componentes/Login";
import { Registro } from "../componentes/registro";
import { RecordarPassword } from "../componentes/cambiarContraseña";
import { useState } from "react";
import { TaskManager } from "../componentes/TaskManajer";

export const Router = () => {
  const [user, setUser] = useState(null)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Registro setUser={setUser} />} />
        <Route path="/password" element={<RecordarPassword />} />
        <Route path="/task-manager" element={<TaskManager />} /> 
        <Route path="/change-password" element={<RecordarPassword />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
