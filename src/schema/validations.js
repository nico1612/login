import * as yup from "yup"

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{7,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const schema = yup.object().shape({
    correo: yup
        .string()
        .matches(emailRegex, "Por favor, ingresa una dirección de correo electrónico válida.")
        .required("Por favor, ingresa tu correo electrónico."),
    password: yup
        .string()
        .matches(passwordRegex, "La contraseña debe ser alfanumérica, con al menos una letra mayúscula, un carácter especial y mayor a 8.")
        .required("Por favor ingrese su contraseña."),
});
