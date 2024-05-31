import * as yup from "yup"

export const schemaLogin = yup.object().shape({
    correo: yup
        .string()
        .email("Por favor, ingresa una dirección de correo electrónico válida.")
        .max(50, 'The Email cannot be more than 50 characters.')
        .required("Please enter your Email ingresa tu correo electrónico."),
        password: yup
        .string()
        .required("Please enter your password.")
        .max(50, 'The password cannot be more than 50 characters.')
        .min(8, "Password must be at least 8 characters.")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
        .matches(/\d/, "Password must contain at least one digit.")
        .matches(/[@$!%*?&.,/()[\]{}]/, "Password must contain at least one special character."),
})

export const schemaRegister = yup.object().shape({
    name: yup.string().required("Please enter your name.").max(50, 'The name cannot be more than 50 characters.'),
    correo: yup.string().email("Please enter a valid email.").required("Please enter your email."),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(8, "Password must be at least 8 characters.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/\d/, "Password must contain at least one digit.")
      .matches(/[@$!%*?&.,/()[\]{}]/, "Password must contain at least one special character."),
    reingresePassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match."),
})

export const schemaRecuperarPassword=yup.object().shape({
    correo: yup.string().email("Please enter a valid email.").required("Please enter your email."),
})