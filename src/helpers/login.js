const usuarios = [
  {
    "mail": "ejemplo1@example.com",
    "password": "Contraseña1$"
  },
  {
    "mail": "usuario2@gmail.com",
    "password": "Prueba#23@"
  },
  {
    "mail": "correo3@hotmail.com",
    "password": "Segura$123"
  }
];

import { app } from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(app);

export const validarUsuario = async (mail, password, setMailError, setPasswordError, setUsuarioRegistrado) => {
  try {
    const authentication = await signInWithEmailAndPassword(auth, mail, password);
    if (authentication) {
      setMailError('');
      setPasswordError('');
      setUsuarioRegistrado(true);
    }
  } catch {
    setMailError('mail incorrecto');
    setPasswordError('password incorrecto');
  }
};
