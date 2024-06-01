import axios from 'axios';

const url= import.meta.env.VITE_APP_IP

export const validarUsuario = async (mail, password, setMailError, setPasswordError) => {
  try{
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { correo: mail, password: password },
    }

    const response = await axios(`${url}/api/auth/login`, options)

    if (response?.data?.usuario) {
      setMailError('');
      setPasswordError('');
      return response?.data?.usuario;
    }
  }catch{
    setMailError('invalid mail');
    setPasswordError('invalid password');
    return false
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