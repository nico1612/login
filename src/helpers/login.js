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

export const EnviarPassword=async(mail)=>{
  try {
    const newPassword=generatePassword()
    console.log(newPassword)
     const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {correo: mail,newPassword},
    } 


    const response = await axios(`${url}/api/auth/updatePassword`, options)

    return 'mensaje enviado';
  } catch (error) {
    console.error(error);
    return error.response.data.msg;
  }
}

const generatePassword = () => {
  const length = Math.floor(Math.random() * (50 - 8 + 1)) + 8; // Random length between 8 and 50
  const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      digits: "0123456789",
      special: "@$!%*?&.,;:/()[\\]{}"
  };

  let password = "";

  password += charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)];
  password += charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)];
  password += charset.digits[Math.floor(Math.random() * charset.digits.length)];
  password += charset.special[Math.floor(Math.random() * charset.special.length)];

  const allChars = charset.uppercase + charset.lowercase + charset.digits + charset.special;
  for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

export const newPassword=async(correo,password,newPassword)=>{
  try{
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {correo,password,newPassword},
  } 
  const response = await axios(`${url}/api/auth/updateLostPassword`, options)
  console.log(response.data.msg)
  return {mensaje:response.data.msg,funcion:true}
}catch(error){
    return {mensaje:error.response.data.msg,funcion:false}
  }
}