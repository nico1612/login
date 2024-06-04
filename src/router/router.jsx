import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../componentes/Login";
import { Registro } from "../componentes/registro";
import { useState } from "react";
import { TaskManager } from "../componentes/TaskManajer";
import { RecordarPassword } from "../componentes/RecordarPassword";
import { NewPassword } from "../componentes/NewPassword";

export const Router = () => {
  const [user, setUser] = useState(null)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Registro setUser={setUser} />} />
        <Route path="/task-manager" element={<TaskManager />} /> 
        <Route path="/change-password" element={<RecordarPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
