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
        .required("Por favor ingrese su contraseña.")
        .test(
            'min-length',
            'La contraseña debe tener una longitud mayor o igual a 8 caracteres.',
            value => value && value.length >= 8
        )
        .test(
            'uppercase',
            'La contraseña debe tener al menos una letra mayúscula.',
            value => value && /[A-Z]/.test(value)
        )
        .test(
            'lowercase',
            'La contraseña debe tener al menos una letra minúscula.',
            value => value && /[a-z]/.test(value)
        )
        .test(
            'number',
            'La contraseña debe tener al menos un número.',
            value => value && /\d/.test(value)
        )
        .test(
            'special-char',
            'La contraseña debe tener al menos un carácter especial.',
            value => value && /[@$!%*?&.,/()[\]{}]/.test(value)
        ),
});
