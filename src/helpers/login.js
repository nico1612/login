const usuarios=[
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
]

export const validarUsuario = (mail, password, setMailError, setPasswordError) => {
    let mailValid = false
    let passwordValid = false

    usuarios.forEach(usuario => {
        if (usuario.mail === mail) {
            mailValid = true
            if (usuario.password === password) {
                passwordValid = true
            }
        }
        if (mailValid && passwordValid) {
            return
        }
    })

    if (mailValid && passwordValid) {
        setMailError('')
        setPasswordError('')
    } else {
        setMailError('mail incorrecto')
        setPasswordError('password incorrecto')
    } 
}