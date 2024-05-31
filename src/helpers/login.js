import { app } from "../config/firebase";
import { sendPasswordResetEmail, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const auth = getAuth(app);
const url= import.meta.env.VITE_APP_IP

export const validarUsuario = async (mail, password, setMailError, setPasswordError) => {

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: { correo: mail, password: password },
  }

  const response = await axios(`${url}/api/auth/login`, options)
  console.log(response)
    
    if (response?.data?.usuario) {
      setMailError('');
      setPasswordError('');
      return response?.data?.usuario;
    }

};

export const crearUsuario = async (mail, password, name,setUser) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { nombre: name, correo: mail,password: password},
    } 

    const response = await axios(`${url}/api/auth`, options)
    setUser(response.data)
   console.log(response.data)
    return true;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return false;
  }
}