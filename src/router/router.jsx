import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "../componentes/Login";
import { RecordarPassword } from "../componentes/RecordarPassword";
import { NewPassword } from "../componentes/NewPassword";
import { Registro } from "../componentes/registro";
import { TaskManager } from "../componentes/TaskManajer";

export const Router = () => {
  const { status } = useSelector((state) => state.auth);
  return (
    <Routes>
      {status !== "authenticated" ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/change-password" element={<RecordarPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/task-manager" element={<TaskManager />} />
          <Route path="/*" element={<Navigate to="/task-manager" />} />
        </>
      )}
    </Routes>
  );
};
