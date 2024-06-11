import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./stores/auth/auth";
import { Router } from './router/router.jsx'

export const App = () => {
  const dispatch = useDispatch(); // <-- Move useDispatch outside of useEffect

  useEffect(() => {
    const dataJSON = localStorage.getItem("usuario");
    let usuario = null;
    try {
      if (dataJSON !== undefined) {
        usuario = JSON.parse(dataJSON);
      }
    } catch (error) {
      console.error('Error parsing JSON', error);
    }
    
    if (usuario) {
      dispatch(login({ usuario }));
    }
  }, [dispatch]); // <-- Add dispatch to the dependency array

  return (
    <Router />
  );
}
